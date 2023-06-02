import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface IBlock extends Document {
  title: string;
  tags: string[];
  ratingTotal: number;
  ratingCount: number;
  rating: number;
  imageUrl: string;
  text: string;
  tier: "free" | "paid";
  views: number;
  price: number;
  createdBy: Types.ObjectId;
}

const BlockSchema: Schema<IBlock> = new mongoose.Schema<IBlock>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    tags: {
      type: [String],
      required: [true, "Please provide at least one tag"],
    },
    ratingTotal: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjyma7ghZ3NnM5A58f5-B8vonB_SiDKzdgowXaUFQRb7dTh-XyUWAd1XfchvPUlwai5lE&usqp=CAU"
    },
    text: {
      type: String,
      required: [true, "Please provide block text"],
    },
    tier: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },
    views: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Block: Model<IBlock> = mongoose.model<IBlock>("Block", BlockSchema);

export default Block;
