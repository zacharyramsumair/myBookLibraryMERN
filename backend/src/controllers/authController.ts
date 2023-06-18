import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import Token from "../models/Token";
import { IJWTUser } from "../interfaces";
import { attachCookiesToResponse } from "../utils/jwt";
import crypto from "crypto";
import sendVerificationEmail from "../utils/sendVerficationEmail";
import { xssOptions } from "../app";
import { filterXSS } from "xss";
import sendResetPasswordEmail from "../utils/sendResetPasswordEmail";
import createHash from "../utils/createHash";

//base url '/api/v1/auth'

// @desc    Register new user
// @route   POST /
// @access  Public
const registerUser = async (req: Request, res: Response) => {
	let { email, name, password } = req.body;

	if (!email || !name || !password) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error("Please provide all values");
	}

	email = filterXSS(email, xssOptions);
	name = filterXSS(name, xssOptions);
	password = filterXSS(password, xssOptions);

	const user = await User.findOne({ email });

	if (user && user.isVerified) {
		res.status(StatusCodes.CONFLICT);
		throw new Error("Email already exists");
	}

	const verificationToken = crypto.randomBytes(40).toString("hex");

	if (user) {
		// Update existing user with the new verification token
		user.name = name;
		user.password = password;
		user.verificationToken = verificationToken;
		await user.save();
	} else {
		// Create a new user with the provided email
		await User.create({
			name,
			email,
			password,
			verificationToken,
		});
	}

	await sendVerificationEmail({
		name,
		email,
		verificationToken,
		origin: process.env.EMAIL_ORIGIN as string,
	});

	res.status(StatusCodes.CREATED).json({
		msg: "Success! Please check your email to verify the account",
	});
};

// @desc    Verify a user's email
// @route   PUT /verify-email
// @access  Public
const verifyEmail = async (req: Request, res: Response) => {
	let { verificationToken, email } = req.body;
	email = filterXSS(email, xssOptions);
	verificationToken = filterXSS(verificationToken, xssOptions);

	const user = await User.findOne({ email });

	if (!user) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Verification Failed");
		return;
	}

	if (user.isVerified) {
		res.status(StatusCodes.OK).json({ msg: "Email already Verified" });
		return;
	}

	if (user.verificationToken !== verificationToken) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Verification Failed token");
		return;
	}

	user.isVerified = true;
	user.verified = new Date();
	user.verificationToken = "";

	await user.save();

	// res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
	res.status(StatusCodes.OK).json({ msg: "Email Verified" });
	return;
};

// @desc    Login a user
// @route   POST /login
// @access  Public
const loginUser = async (req: Request, res: Response) => {
	// res.cookie("XSRF-TOKEN", req.csrfToken());

	let { email, password } = req.body;
	email = filterXSS(email, xssOptions);
	password = filterXSS(password, xssOptions);

	if (!email || !password) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error("Please provide email and password");
	}
	const user = await User.findOne({ email });

	if (!user) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Invalid email or password");
	}

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Invalid email or password");
	}

	if (!user.isVerified) {
		const verificationToken = crypto.randomBytes(40).toString("hex");

		// Update existing user with the new verification token
		user.verificationToken = verificationToken;
		await user.save();

		await sendVerificationEmail({
			name: user.name,
			email,
			verificationToken,
			origin: process.env.EMAIL_ORIGIN as string,
		});

		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Please verify your email");
	}

	const tokenUser: IJWTUser = {
		name: user.name,
		user: user._id,
		role: user.role,
		tier: user.tier,
	};

	let refreshToken = "";

	// check for existing token
	const existingToken = await Token.findOne({ user: user._id });

	if (existingToken) {
		const { isValid } = existingToken;
		if (!isValid) {
			res.status(StatusCodes.UNAUTHORIZED);
			throw new Error(
				"This account has been banned for suspicious activity"
			);
		}
		refreshToken = existingToken.refreshToken;
		attachCookiesToResponse({ res, user: user._id, refreshToken });
		res.status(StatusCodes.OK).json({ user: tokenUser });
		return;
	}

	refreshToken = crypto.randomBytes(40).toString("hex");
	const userAgent = req.headers["user-agent"];
	const ip = req.ip;
	const userToken = { refreshToken, userAgent, ip, user: user._id };

	await Token.create(userToken);

	attachCookiesToResponse({ res, user: user._id, refreshToken });

	res.status(StatusCodes.OK).json({ user: tokenUser });
};

// @desc    Get user data
// @route   GET /showCurrentUser
// @access  Private
const showCurrentUser = async (req: Request, res: Response) => {
	// console.log("showcurrent", req.user)

	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	const user = await User.findOne({ _id: req.user });
	if (!user) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error("User not found");
	}

	const { name, email, _id: id, role, tier, profilePic, noOfGems } = user;
	res.status(StatusCodes.OK).json({
		name,
		email,
		id,
		role,
		tier,
		profilePic,
		noOfGems,
	});
	// res.status(StatusCodes.OK).json({ user });
};

// @desc    Logout User
// @route   DELETE /logout
// @access  Private
const logout = async (req: Request, res: Response) => {
	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}
	await Token.findOneAndDelete({ user: req.user });

	res.cookie("accessToken", "logout", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.cookie("refreshToken", "logout", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

// @desc    Send email to reset password
// @route   POST /forgot-password
// @access  Public
const forgotPassword = async (req: Request, res: Response) => {
	const { email } = req.body;
	if (!email) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error("Please provide valid email");
	}

	const user = await User.findOne({ email });
	if (!user) {
		// sent the same message so hackers can't use here to check which emails are in our database
		setTimeout(() => {
			res.status(StatusCodes.OK).json({
				msg: "Please check your email for reset password link",
			});
		}, 2500); // Delay of 2 seconds (2000 milliseconds)
		return; // Return from the function to prevent further execution
	}

	if (user) {
		const passwordToken = crypto.randomBytes(70).toString("hex");
		// send email

		await sendResetPasswordEmail({
			name: user.name,
			email: user.email,
			token: passwordToken,
			origin: process.env.EMAIL_ORIGIN as string,
		});

		const tenMinutes = 1000 * 60 * 10;
		const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

		user.passwordToken = createHash(passwordToken);
		user.passwordTokenExpirationDate = passwordTokenExpirationDate;
		await user.save();
	}

	res.status(StatusCodes.OK).json({
		msg: "Please check your email for reset password link",
	});
};

// @desc    Form to change your password
// @route   PUT /reset-password
// @access  Public
const resetPassword = async (req: Request, res: Response) => {
	const { token, email, password } = req.body;
	if (!token || !email || !password) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error("Please provide all values");
	}
	const user = await User.findOne({ email });

	if (user) {
		const currentDate = new Date();

		if (
			user.passwordToken === createHash(token) &&
			user.passwordTokenExpirationDate &&
			user.passwordTokenExpirationDate > currentDate
		) {
			user.password = password;
			user.passwordToken = null;
			user.passwordTokenExpirationDate = null;
			await user.save();
		}
	}

	res.status(StatusCodes.OK).json({ msg: "Password Reset" });
};

// @desc    Edit user settings page
// @route   PUT /profile
// @access  Private
const editProfile = async (req: Request, res: Response) => {
	const {
		name,
		birthday,
		location,
		aboutMe,
		website,
		showFavoriteTags,
		showFavorites,
		profilePic,
	} = req.body;

	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	console.log(currentUser.birthday);
	console.log(birthday);
	currentUser.name = name;
	currentUser.birthday = birthday;
	currentUser.location = location;
	currentUser.aboutMe = aboutMe;
	currentUser.website = website;
	currentUser.showFavoriteTags = showFavoriteTags;
	currentUser.showFavorites = showFavorites;
	currentUser.profilePic = profilePic;

	await currentUser.save();

	return res.json(currentUser);
};

// @desc    Get profile info to populate edit page
// @route   GET /userprofile
// @access  private
const getMyProfilePageForEditing = async (req: Request, res: Response) => {
	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	// res.json({msg:"your really should see this"})
	res.json({
		name: currentUser.name ,
		birthday: currentUser.birthday ,
		location: currentUser.location,
		aboutMe: currentUser.aboutMe,
		website: currentUser.website,
		showFavoriteTags: currentUser.showFavoriteTags,
		showFavorites: currentUser.showFavorites,
		profilePic: currentUser.profilePic,
	});
};

// @desc    Get user profile page
// @route   GET /profile/:id
// @access  Public
const getProfilePage = async (req: Request, res: Response) => {
	const { id } = req.params; // Assuming the user ID is provided as a route parameter
  
	const user = await User.findById(id)
	  .populate("favorites", "title imageUrl tags")
	  .populate("userRatings.blockInfo", "title imageUrl")
	  .populate("myBlocks", "title imageUrl tags")
	  .exec();
  
	if (!user) {
	  res.status(StatusCodes.NOT_FOUND);
	  throw new Error("User not found");
	}
  
	// Get the three tags with the highest count
	const favoriteTags = user.showFavoriteTags
	  ? user.favoriteTags
		  .filter((tag) => tag.count > 0) // Filter tags with a count over 0
		  .sort((a, b) => b.count - a.count) // Sort tags in descending order of count
		  .slice(0, 2) // Take the top two tags
		  .map((tag) => tag.tagName) // Extract the tag names
	  : null;
  
	const userProfile = {
	  personalInfo: {
		name: user.name,
		email: user.email,
		location: user.location,
		aboutMe: user.aboutMe,
		website: user.website,
		favoriteTags: favoriteTags,
		birthday: user.birthday,
		profilePic: user.profilePic,
	  },
	  favoriteBlocks: user.showFavorites ? user.favorites : null,
	  ratedBlocks: user.userRatings.map((rating) => ({
		block: rating.blockInfo,
		rating: rating.rating,
	  })),
	  createdBlocks: user.myBlocks,
	};
  
	res.status(StatusCodes.OK).json(userProfile);
  };
  

// @desc    Get user's favorite blocks
// @route   GET /profile/favorite-blocks
// @access  Public
const getFavoriteBlocks = async (req: Request, res: Response) => {
	const { userId } = req.query;
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;

	const user = await User.findById(userId)
		.populate({
			path: "favorites",
			select: "title image tags",
			options: {
				skip: (page - 1) * limit,
				limit,
			},
		})
		.exec();

	if (!user) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error("User not found");
	}

	const favoriteBlocks = user.favorites;

	res.status(StatusCodes.OK).json(favoriteBlocks);
};

// @desc    Get user's rated blocks
// @route   GET /profile/rated-blocks
// @access  Public
const getRatedBlocks = async (req: Request, res: Response) => {
	const { userId } = req.query;
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;

	const user = await User.findById(userId)
		.populate({
			path: "userRatings.block",
			select: "title image tags",
			options: {
				skip: (page - 1) * limit,
				limit,
			},
		})
		.exec();

	if (!user) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error("User not found");
	}

	const ratedBlocks = user.userRatings.map((rating) => ({
		block: rating.blockInfo,
		rating: rating.rating,
	}));

	res.status(StatusCodes.OK).json(ratedBlocks);
};

// @desc    Get user's created blocks
// @route   GET /profile/created-blocks
// @access  Public
const getCreatedBlocks = async (req: Request, res: Response) => {
	const { userId } = req.query;
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;

	const user = await User.findById(userId)
		.populate({
			path: "myBlocks",
			select: "title image tags",
			options: {
				skip: (page - 1) * limit,
				limit,
			},
		})
		.exec();

	if (!user) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error("User not found");
	}

	const createdBlocks = user.myBlocks;

	res.status(StatusCodes.OK).json(createdBlocks);
};

export default {
	registerUser,
	verifyEmail,
	loginUser,
	showCurrentUser,
	logout,
	forgotPassword,
	resetPassword,
	editProfile,
	getMyProfilePageForEditing,
	getProfilePage,
	getFavoriteBlocks,
	getRatedBlocks,
	getCreatedBlocks,
};
