"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
var BlockTag;
(function (BlockTag) {
    BlockTag["Biography"] = "biography";
    BlockTag["Business"] = "business";
    BlockTag["Children"] = "children";
    BlockTag["Classics"] = "classics";
    BlockTag["Fantasy"] = "fantasy";
    BlockTag["Fiction"] = "fiction";
    BlockTag["HistoricalFiction"] = "historicalfiction";
    BlockTag["History"] = "history";
    BlockTag["Horror"] = "horror";
    BlockTag["Memoir"] = "memoir";
    BlockTag["Mystery"] = "mystery";
    BlockTag["Nonfiction"] = "nonfiction";
    BlockTag["Poetry"] = "poetry";
    BlockTag["Romance"] = "romance";
    BlockTag["Science"] = "science";
    BlockTag["ScienceFiction"] = "sciencefiction";
    BlockTag["SelfHelp"] = "selfhelp";
    BlockTag["Thriller"] = "thriller";
    BlockTag["YoungAdult"] = "youngadult";
})(BlockTag || (BlockTag = {}));
const BlockSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        validate: {
            validator: (title) => validator_1.default.isLength(title, { max: 75 }),
            message: "Location must be at most 75 characters",
        },
    },
    tags: {
        type: [
            {
                type: String,
                enum: Object.values(BlockTag),
            },
        ],
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
        validate: {
            validator: (rating) => rating === null || (rating >= 0 && rating <= 5),
            message: "Rating must be a number between 0 and 5 or null",
        },
    },
    imageUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjyma7ghZ3NnM5A58f5-B8vonB_SiDKzdgowXaUFQRb7dTh-XyUWAd1XfchvPUlwai5lE&usqp=CAU",
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    favoriteCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
const BlockModel = mongoose_1.default.model("Block", BlockSchema);
exports.default = BlockModel;
