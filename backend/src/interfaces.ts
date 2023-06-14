import { Types } from "mongoose";

export interface IJWTUser {
	user: Types.ObjectId;
	name: string;
	role: "admin" | "user";
	tier: "free" | "standard" | "premium";

	// _id: Types.ObjectId;
	// _bsontype: string;
	// id: string;
	// toHexString(): string;
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
