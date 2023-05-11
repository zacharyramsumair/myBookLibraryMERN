import { Types } from "mongoose";

export interface IJWTUser {
    userId: Types.ObjectId;
    name: string;
    role: 'admin' | 'user';
    tier: 'free' | 'standard' | 'premium';

  }