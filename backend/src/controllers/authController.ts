import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { IJWTUser } from "../interfaces";
import { attachCookiesToResponse } from "../utils/jwt";
import crypto from "crypto";
import sendVerificationEmail from "../utils/sendVerficationEmail";

//base url '/api/v1/auth'

// @desc    Register new user
// @route   POST /
// @access  Public
const registerUser = async (req: Request, res: Response) => {
	// res.cookie("XSRF-TOKEN", req.csrfToken());
	const { email, name, password } = req.body;

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
		origin:process.env.EMAIL_ORIGIN as string,
	  })


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
	const { verificationToken, email } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Verification Failed");
	}

	if (user.verificationToken !== verificationToken) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Verification Failed");
	}

	user.isVerified = true;
	user.verified = new Date();
	user.verificationToken = "";

	await user.save();

	// res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
	res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
};

// @desc    Login a user
// @route   POST /login
// @access  Public
const loginUser = async (req: Request, res: Response) => {
	// res.cookie("XSRF-TOKEN", req.csrfToken());

	const { email, password } = req.body;

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
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.OK).json({ user: tokenUser });
};

// @desc    Get user data
// @route   GET /showCurrentUser
// @access  Private
const showCurrentUser = async (req: Request, res: Response) => {
	// const csrfToken = req.cookies["XSRF-TOKEN"];
	// if (!csrfToken || req.csrfToken() !== csrfToken) {
	// 	return res
	// 		.status(StatusCodes.FORBIDDEN)
	// 		.json({ error: "Invalid CSRF token" });
	// }
	res.status(StatusCodes.OK).json({ user: req.user });
};

const logout = async (req: Request, res: Response) => {
	// res.cookie("XSRF-TOKEN", req.csrfToken());

	res.cookie("token", "logout", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export default {
	registerUser,
	verifyEmail,
	loginUser,
	showCurrentUser,
	logout,
};
