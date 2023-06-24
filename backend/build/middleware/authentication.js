"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jwt_1 = require("../utils/jwt");
const http_status_codes_1 = require("http-status-codes");
const Token_1 = __importDefault(require("../models/Token"));
function isJwtPayload(obj) {
    return (obj &&
        typeof obj === "object" &&
        // "name" in obj &&
        "userId" in obj
    // "userId" in obj &&
    // "role" in obj &&
    // "tier" in obj
    );
}
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken, accessToken } = req.signedCookies;
    try {
        if (accessToken) {
            const payload = (0, jwt_1.isTokenValid)(accessToken);
            req.user = payload.user;
            return next();
        }
        //refresh token
        const payload = (0, jwt_1.isTokenValid)(refreshToken);
        const existingToken = yield Token_1.default.findOne({
            user: payload.user,
            refreshToken: payload.refreshToken,
        });
        if (!existingToken || !(existingToken === null || existingToken === void 0 ? void 0 : existingToken.isValid)) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
            throw new Error("Authentication Invalid");
        }
        (0, jwt_1.attachCookiesToResponse)({
            res,
            user: payload.user,
            refreshToken: existingToken.refreshToken,
        });
        req.user = payload.user;
        next();
    }
    catch (error) {
        // res.status(StatusCodes.UNAUTHORIZED);
        // throw new Error("Authentication Invalid");
        // not throwing an error since we have some routes that would be both public and private and we need req.user for that
        // to get around this, we will check for currentUser if the user needs to be logged in to perform an action
        next();
    }
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
});
exports.authenticateUser = authenticateUser;
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
