import validator from "validator";
import bcrypt from "bcryptjs";
import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { Url } from "url";

interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: "admin" | "user";
	tier: "free" | "standard" | "premium";
	verificationToken: string;
	isVerified: boolean;
	verified: Date;
	passwordToken: string | null;
	passwordTokenExpirationDate: Date | null;
	comparePassword: (candidatePassword: string) => Promise<boolean>;
	noOfGems: number;
	favorites: Types.ObjectId[]; // Array of Block IDs
	userShelf: Types.ObjectId[]; // Array of Block IDs
	myBlocks: Types.ObjectId[]; // Array of Block IDs
	blocksBought: Types.ObjectId[]; // Array of Block IDs
	favoriteTags: { tagName: string; count: number }[];
	userRatings: { blockInfo: Types.ObjectId; rating: number }[];
	birthday: string;
	location: string;
	aboutMe: string;
	website: string;
	profilePic: string;
	showFavorites: boolean;
	showFavoriteTags: boolean;
	stripeCustomerId: string;
	lastGemIncrement: Date;
	nextGemIncrement: Date;
}

const UserSchema: Schema<IUser> = new mongoose.Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, "Please provide name"],
			validate: {
				validator: (name: string) =>
					validator.isLength(name, { min: 2, max: 50 }),
				message: "Name must be between 2 and 50 characters",
			},
		},
		email: {
			type: String,
			unique: true,
			required: [true, "Please provide email"],
			validate: {
				validator: (value: string) => validator.isEmail(value),
				message: "Please provide valid email",
			},
		},
		password: {
			type: String,
			required: [true, "Please provide password"],
			validate: {
				validator: (password: string) =>
					validator.isStrongPassword(password, {
						minLength: 6,
						minNumbers: 1,
						minUppercase: 1,
						minSymbols: 1,
					}),
				message:
					"Password must contain at least 6 characters, including 1 uppercase letter, 1 number, and 1 special character",
			},
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
		tier: {
			type: String,
			enum: ["free", "standard", "premium"],
			default: "free",
		},
		verificationToken: String,
		isVerified: {
			type: Boolean,
			default: false,
		},
		verified: Date,
		passwordToken: {
			type: String,
		},
		passwordTokenExpirationDate: {
			type: Date,
		},
		noOfGems: {
			type: Number,
			default: 0,
		},
		favorites: {
			type: [Schema.Types.ObjectId],
			ref: "Block", // Assuming the Block model is named "Block"
		},
		userShelf: {
			type: [Schema.Types.ObjectId],
			ref: "Block", // Assuming the Block model is named "Block"
		},
		myBlocks: {
			type: [Schema.Types.ObjectId],
			ref: "Block", // Assuming the Block model is named "Block"
		},
		blocksBought: {
			type: [Schema.Types.ObjectId],
			ref: "Block", // Assuming the Block model is named "Block"
		},
		favoriteTags: [
			{
				tagName: {
					type: String,
					required: true,
				},
				count: {
					type: Number,
					default: 0,
				},
			},
		],
		userRatings: [
			{
				blockInfo: {
					type: [Schema.Types.ObjectId],
					ref: "Block", // Assuming the Block model is named "Block"
				},
				rating: {
					type: Number,
					default: 0,
				},
			},
		],
		birthday: {
			type: String,
			default: "yyyy-MM-dd",
		},
		location: {
			type: String,
			validate: {
				validator: (location: string) =>
					validator.isLength(location, { max: 50 }),
				message: "Location must be at most 50 characters",
			},
			default: "",
		},
		aboutMe: {
			type: String,
			validate: {
				validator: (aboutMe: string) =>
					validator.isLength(aboutMe, { max: 250 }),
				message: "About Me must be at most 250 characters",
			},
			default: "",
		},
		website: {
			type: String,
			default: "",
		},
		profilePic: {
			type: String,
			default:
				"data:image/jpeg;base64,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",
		},
		showFavorites: {
			type: Boolean,
			default: true,
		},
		showFavoriteTags: {
			type: Boolean,
			default: true,
		},
		stripeCustomerId: {
			type: String,
			required: true,
		},
		lastGemIncrement: { type: Date },
		nextGemIncrement: { type: Date },
	},
	{ timestamps: true }
);

UserSchema.pre<IUser>("save", async function () {
	if (!this.isModified("password")) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
