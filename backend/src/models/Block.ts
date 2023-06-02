import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface IBlock extends Document {
  title: string;
  tags: string[];
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
    rating: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
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
