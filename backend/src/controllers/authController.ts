import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { IJWTUser } from "../interfaces";
import { attachCookiesToResponse } from "../utils/jwt";
import { CustomRequest } from "../routes/authRoutes";




//base url '/api/v1/auth'

// @desc    Register new user
// @route   POST /
// @access  Public
const registerUser = async (req: Request, res: Response) => {
	const { email, name, password } = req.body;

	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		res.status(StatusCodes.CONFLICT);
		throw new Error("Email already exists");
	}

	const user = await User.create({ name, email, password });

	const tokenUser: IJWTUser = {
		name: user.name,
		userId: user._id,
		role: user.role,
		tier: user.tier,
	};
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

// @desc    Login a user
// @route   POST /login
// @access  Public
const loginUser = async (req: Request, res: Response) => {
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
  res.status(StatusCodes.OK).json({ user: req.user });
  // req.user = "hello"
	// res.send("info about user");
};

const logout = async (req: Request, res: Response) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

export default {
	registerUser,
	loginUser,
	showCurrentUser,
  logout
};
