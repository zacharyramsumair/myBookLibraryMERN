import { attachCookiesToResponse, isTokenValid } from "../utils/jwt";
import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import Token from "../models/Token";

function isJwtPayload(obj: any): obj is JwtPayload {
	return (
		obj &&
		typeof obj === "object" &&
		// "name" in obj &&
		"userId" in obj 
		// "userId" in obj &&
		// "role" in obj &&
		// "tier" in obj
	);
}

export const authenticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { refreshToken, accessToken } = req.signedCookies;

	try {
		if (accessToken) {
		  const payload = isTokenValid(accessToken);
		  req.user = payload.user;
		  return next();
		}

		//refresh token 
		const payload = isTokenValid(refreshToken);
	
		const existingToken = await Token.findOne({
		  user: payload.user.userId,
		  refreshToken: payload.refreshToken,
		});
	
		if (!existingToken || !existingToken?.isValid) {
		res.status(StatusCodes.UNAUTHORIZED)
		  throw new Error('Authentication Invalid');
		}
	
		attachCookiesToResponse({
		  res,
		  user: payload.user,
		  refreshToken: existingToken.refreshToken,
		});
	
		req.user = payload.user;
		next();
	  } catch (error) {
		res.status(StatusCodes.UNAUTHORIZED)
		throw new Error('Authentication Invalid');	  }

	// try {
		
	// } catch (error) {
		
	// }
	// if (!token) {
	// 	res.status(StatusCodes.UNAUTHORIZED);
	// 	throw new Error("Authentication Invalid 1");
	// }

	// try {
	// 	const TokenData = isTokenValid(token);

	// 	if (!isJwtPayload(TokenData)) {
    //         res.status(StatusCodes.UNAUTHORIZED);
	// 		throw new Error("Invalid token");
	// 	}

	// 	const { name, userId, role, tier } = TokenData;
	// 	req.user = { userId };
	// 	// req.user = { name, userId, role, tier };


	// 	next();
	// } catch (error) {
	// 	res.status(StatusCodes.UNAUTHORIZED);
	// 	throw new Error("Authentication Invalid2");
	// }
};

// export const authorizePermissions = (...roles) => {
//   return (req:Request, res:Response, next:NextFunction) => {
//     if (!roles.includes(req.user.role)) {
//         res.status(StatusCodes.UNAUTHORIZED)
//       throw new Error(
//         'Unauthorized to access this route'
//       );
//     }
//     next();
//   };
// };
