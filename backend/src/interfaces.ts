import { Types } from "mongoose";

export interface IJWTUser {
    userId: Types.ObjectId;
    name: string;
    role: 'admin' | 'user';
    tier: 'free' | 'standard' | 'premium';
}

export interface IBlock {
    id: Types.ObjectId;
    title: string;
    rating: number;
    tags: string[];
    views: number;
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


