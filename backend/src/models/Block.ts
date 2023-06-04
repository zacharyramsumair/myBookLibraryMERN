import mongoose, { Document, Model, Schema } from "mongoose";

enum BlockTag {
	Biography = "biography",
	Business = "business",
	Children = "children",
	Classics = "classics",
	Fantasy = "fantasy",
	Fiction = "fiction",
	HistoricalFiction = "historicalFiction",
	History = "history",
	Horror = "horror",
	Memoir = "memoir",
	Mystery = "mystery",
	Nonfiction = "nonfiction",
	Poetry = "poetry",
	Romance = "romance",
	Science = "science",
	ScienceFiction = "scienceFiction",
	SelfHelp = "self help",
	Thriller = "thriller",
	YoungAdult = "youngAdult",
}

interface reply {
	replyTo: {
		creator: mongoose.Types.ObjectId;
		text: String;
	};
	content: String;
	createdBy: mongoose.Types.ObjectId;
}

// interface Comment {
// 	content: String;
// 	createdBy: mongoose.Types.ObjectId;
// 	replies: reply[];
// }

interface Block extends Document {
	title: string;
	tags: BlockTag[];
	ratingTotal: number;
	ratingCount: number;
	rating: number;
	imageUrl: string;
	text: string;
	tier: "free" | "paid";
	views: number;
	price: number;
	createdBy: mongoose.Types.ObjectId;
	// comments: Comment[];
}

const BlockSchema: Schema<Block> = new mongoose.Schema<Block>(
	{
		title: {
			type: String,
			required: [true, "Please provide a title"],
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
		},
		imageUrl: {
			type: String,
			default:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjyma7ghZ3NnM5A58f5-B8vonB_SiDKzdgowXaUFQRb7dTh-XyUWAd1XfchvPUlwai5lE&usqp=CAU",
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
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		// comments: {
		// 	type: [
		// 		{
		// 			// title: String,
		// 			content: String,
		// 			createdBy: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User",
    //       },
		// 			replies: {
		// 				type: [
		// 					{
		// 						replyTo: {
		// 							creator: {
    //                 type: mongoose.Schema.Types.ObjectId,
    //                 ref: "User",
    //               },
		// 							text: String,
		// 						},
		// 						content: String,
		// 						createdBy: {
    //               type: mongoose.Schema.Types.ObjectId,
    //               ref: "User",
    //             }
		// 					},
		// 				],
		// 				default: [],
		// 			},
		// 		},
		// 	],
		// 	default: [],
		// },
	},
	{ timestamps: true }
);

const BlockModel: Model<Block> = mongoose.model<Block>("Block", BlockSchema);

export default BlockModel;
