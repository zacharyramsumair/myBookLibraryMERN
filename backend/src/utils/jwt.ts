import jwt, { JwtPayload } from "jsonwebtoken";
import { IJWTUser } from "../interfaces";
import { Response } from "express";
import { Types } from "mongoose";

interface AttachCookiesToResponseArgs {
	res: Response;
	user: IJWTUser;
	refreshToken: string;
}

interface IJWTUserTokens {
	user: {
		userId: Types.ObjectId;
		name: string;
		role: "admin" | "user";
		tier: "free" | "standard" | "premium";
	};
	refreshToken?: string;
}

interface CreateJWTArgs {
	payload: IJWTUserTokens;
}

interface TokenData {
	name: string;
	userId: string;
	role: "admin" | "user";
	tier: "free" | "standard" | "premium";
	iat: Date;
	exp: Date;
}

export const createJWT = ({ payload }: CreateJWTArgs) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET as string);
	return token;
};

// export const isTokenValid = (token: string) => {
// 	// export const isTokenValid = ({token}: { token: string }) => {
// 	// console.log(token);
// 	return jwt.verify(token, process.env.JWT_SECRET as string);
// };

export const isTokenValid = (token: string): JwtPayload => {
  const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  return payload;
};

export const attachCookiesToResponse = ({
	res,
	user,
	refreshToken,
}: AttachCookiesToResponseArgs) => {

	const accessTokenJWT = createJWT({ payload: { user } });
	const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

	const oneDay = 1000 * 60 * 60 * 24;

	res.cookie("accessToken", accessTokenJWT, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		signed: true,
    // 60 minutes, 1000 milliseconds = 1 second
    // 1second * 60 = 1 min 
    // 1 min * 60 
		maxAge: 1000 * 60 * 60,
	});

	res.cookie("refreshToken", refreshTokenJWT, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		signed: true,
    // 30days
		expires: new Date(Date.now() + oneDay *30),
	});
};

// This is to attach a single cookie to the response
// export const attachCookiesToResponse = ({ res, user }: AttachCookiesToResponseArgs) => {
//   const token = createJWT({ payload: user });

//   const oneDay = 1000 * 60 * 60 * 24;

//   res.cookie('token', token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === 'production',
//     signed: true,
//   });
// };
