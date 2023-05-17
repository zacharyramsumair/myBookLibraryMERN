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
	// res.cookie("XSRF-TOKEN", req.csrfToken());
	let { email, name, password } = req.body;
	email = filterXSS(email, xssOptions);
	name = filterXSS(name, xssOptions);
	password = filterXSS(password, xssOptions);
	// console.log(req.body.)
	console.log(email, name, password);

	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		res.status(StatusCodes.CONFLICT);
		throw new Error("Email already exists");
	}

	const verificationToken = crypto.randomBytes(40).toString("hex");

	const user = await User.create({
		name,
		email,
		password,
		verificationToken,
	});

	await sendVerificationEmail({
		name: user.name,
		email: user.email,
		verificationToken: user.verificationToken,
		origin: process.env.EMAIL_ORIGIN as string,
	});

	res.status(StatusCodes.CREATED).json({
		msg: "Success! Please check your email to verify account",
	});
	// const user = await User.create({ name, email, password });
	// const tokenUser: IJWTUser = {
	// 	name: user.name,
	// 	userId: user._id,
	// 	role: user.role,
	// 	tier: user.tier,
	// };
	// attachCookiesToResponse({ res, user: tokenUser });
	// res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const verifyEmail = async (req: Request, res: Response) => {
	let { verificationToken, email } = req.body;
	email = filterXSS(email, xssOptions);
	verificationToken = filterXSS(verificationToken, xssOptions);

	const user = await User.findOne({ email });

	if (!user) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Verification Failed");
	}

	if (user.verificationToken == "completed") {
		res.status(StatusCodes.OK).json({ msg: "Email already Verified" });
	}

	if (user.verificationToken !== verificationToken) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Verification Failed");
	}

	user.isVerified = true;
	user.verified = new Date();
	user.verificationToken = "completed";

	await user.save();

	// res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
	res.status(StatusCodes.OK).json({ msg: "Email Verified" });
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
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Please verify your email");
	}

	const tokenUser: IJWTUser = {
		name: user.name,
		userId: user._id,
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
			throw new Error("Invalid Credentials");
		}
		refreshToken = existingToken.refreshToken;
		attachCookiesToResponse({ res, user: tokenUser, refreshToken });
		res.status(StatusCodes.OK).json({ user: tokenUser });
		return;
	}

	refreshToken = crypto.randomBytes(40).toString("hex");
	const userAgent = req.headers["user-agent"];
	const ip = req.ip;
	const userToken = { refreshToken, userAgent, ip, user: user._id };

	await Token.create(userToken);

	attachCookiesToResponse({ res, user: tokenUser, refreshToken });

	res.status(StatusCodes.OK).json({ user: tokenUser });
};

// @desc    Get user data
// @route   GET /showCurrentUser
// @access  Private
const showCurrentUser = async (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({ user: req.user });
};

const logout = async (req: Request, res: Response) => {
	await Token.findOneAndDelete({ user: req.user.userId });

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

const forgotPassword = async (req: Request, res: Response) => {
	const { email } = req.body;
	if (!email) {
		res.status(StatusCodes.BAD_REQUEST)
	  throw new Error('Please provide valid email');
	}
  
	const user = await User.findOne({ email });
  
	if (user) { 
	  const passwordToken = crypto.randomBytes(70).toString('hex');
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
  
	res
	  .status(StatusCodes.OK)
	  .json({ msg: 'Please check your email for reset password link' });
  };

  const resetPassword = async (req: Request, res: Response) => {
	const { token, email, password } = req.body;
	if (!token || !email || !password) {
		res.status(StatusCodes.BAD_REQUEST)
	  throw new Error('Please provide all values');
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
  
	res
	.status(StatusCodes.OK)
	.json({ msg: 'Password Reset' });  };

export default {
	registerUser,
	verifyEmail,
	loginUser,
	showCurrentUser,
	logout,
	forgotPassword,
	resetPassword

};