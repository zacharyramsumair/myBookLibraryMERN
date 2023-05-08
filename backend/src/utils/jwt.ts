import jwt from "jsonwebtoken"
import { IJWTUser } from '../interfaces';
import  {  Response } from "express";


interface AttachCookiesToResponseArgs {
  res: Response;
  user: IJWTUser;
}

interface CreateJWTArgs {
  payload: IJWTUser;
}

interface TokenData {
    name: string;
    userId: string;
    role: 'admin' |'user';
    tier: 'free' |'standard' | 'premium';
    iat: Date;
    exp:Date;
  }

export const createJWT = ({ payload }: CreateJWTArgs) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

export const isTokenValid = (token:string) => {
// export const isTokenValid = ({token}: { token: string }) => {
    console.log(token)
    return jwt.verify(token, process.env.JWT_SECRET as string)
};

export const attachCookiesToResponse = ({ res, user }: AttachCookiesToResponseArgs) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};
