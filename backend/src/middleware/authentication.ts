import { isTokenValid } from "../utils/jwt";
import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";


export const authenticateUser = async (req:Request, res:Response, next:NextFunction) => {
  const token = req.signedCookies.token;
//   const token = req.cookies.token;

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED)
    throw new Error('Authentication Invalid 1');
  }

  try {
    const { name, userId, role, tier } = isTokenValid(token)
// console.log(isTokenValid(token))
    req.user = { name, userId, role, tier };
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED)
    throw new Error('Authentication Invalid2');
  }
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

