"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachCookiesToResponse = exports.isTokenValid = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = ({ payload }) => {
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
    return token;
};
exports.createJWT = createJWT;
// export const isTokenValid = (token: string) => {
// 	// export const isTokenValid = ({token}: { token: string }) => {
// 	// console.log(token);
// 	return jwt.verify(token, process.env.JWT_SECRET as string);
// };
const isTokenValid = (token) => {
    const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    return payload;
};
exports.isTokenValid = isTokenValid;
const attachCookiesToResponse = ({ res, user, refreshToken, }) => {
    // console.log("user :", user )
    // console.log("user :", typeof user )
    const accessTokenJWT = (0, exports.createJWT)({ payload: { user } });
    const refreshTokenJWT = (0, exports.createJWT)({ payload: { user, refreshToken } });
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("accessToken", accessTokenJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true,
        maxAge: 1000 * 60 * 10,
    });
    res.cookie("refreshToken", refreshTokenJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true,
        expires: new Date(Date.now() + oneDay * 30),
    });
};
exports.attachCookiesToResponse = attachCookiesToResponse;
//not being used
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
