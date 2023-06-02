import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Block from "../models/Block";
import { IBlock } from "../interfaces";
import User from "../models/User";

// @desc    Get all blocks
// @route   GET /api/v1/blocks
// @access  Public
const getAllBlocks = async (req: Request, res: Response) => {
	const blocks = await Block.find(
		{},
		"title tags price tier imageUrl createdBy"
	).populate("createdBy", "name email"); // Populate the createdBy field with the name and email fields of the User model    res.status(StatusCodes.OK).json({count:blocks.length,blocks});
	res.status(StatusCodes.OK).json({ count: blocks.length, blocks });
};

// @desc    buy a paid block using gems
// @route   POST /api/v1/blocks/buy/:id
// @access  Private
const buyBlock = async (req: Request, res: Response) => {
	const { id } = req.params;
	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	const block = await Block.findById(id);
	if (!block) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error("Block not found");
	}

	if (block.tier == "free") {
		return res.status(StatusCodes.OK).json({
			msg: `Block ${block._id} is free and does not need to be purchased.`,
		});
	}

	if (currentUser.noOfGems < block.price) {
		res.status(StatusCodes.EXPECTATION_FAILED);
		throw new Error("Not enough gems.");
	}
	currentUser.noOfGems -= block.price;
	currentUser.blocksBought.push(block._id);
	await currentUser.save();
	return res
		.status(StatusCodes.OK)
		.json({ msg: `${currentUser._id} bought block ${block._id}` });
};

// @desc    Get a specific block by ID
// @route   GET /api/v1/blocks/:id
// @access  Public
const getBlockById = async (req: Request, res: Response) => {
	const { id } = req.params;

	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	const block = await Block.findById(id);
	if (!block) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error("Block not found");
	}

	block.views += 1;
	await block.save();

	if (block.tier === "paid") {
		if (!currentUser.blocksBought.includes(block._id)) {
			const limitedText = block.text.slice(0, 100); // Get the first 100 characters of the block text
			const blockData = { ...block.toJSON(), text: limitedText };
			return res.status(StatusCodes.UNAUTHORIZED).json(blockData);
		}
	}

	return res.status(StatusCodes.OK).json(block);
};

// @desc    Create a block
// @route   POST /api/v1/blocks
// @access  Private
const createBlock = async (req: Request, res: Response) => {
	const { title, tags, imageUrl, text, price } = req.body;

	 // Check if the number of tags exceeds the limit
	 if (tags.length > 4) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error("Number of tags cannot exceed 4");
	  }

	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	if (price != 0) {
		let paidBlockCost: number = Number(process.env.PAID_BLOCK_COST);
		if (!currentUser || currentUser.noOfGems < paidBlockCost) {
			res.status(StatusCodes.EXPECTATION_FAILED);
			throw new Error("Not enough gems.");
		}
	}

	const block = await Block.create({
		...req.body,
		tier: price == 0 ? "free" : "paid",
		createdBy: req.user,
	});
	await block.save();

	currentUser.myBlocks.push(block._id);
	await currentUser.save();

	res.status(StatusCodes.CREATED).json(block);
};

// @desc    Update a block
// @route   PUT /api/v1/blocks/:id
// @access  Private
const updateBlock = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, tags, imageUrl, text, price, tier } = req.body;

	 // Check if the number of tags exceeds the limit
	 if (tags.length > 4) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error("Number of tags cannot exceed 4");
	  }

	const block = await Block.findById(id);
	if (!block) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error("Block not found");
	}

	// Check if the current user is the creator of the block
	if (!block.createdBy.equals(req.user)) {
		console.log("this piece");
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	block.title = title;
	block.tags = tags;
	block.imageUrl = imageUrl;
	block.text = text;
	block.price = price;
	block.tier = tier;

	await block.save();
	res.status(StatusCodes.OK).json(block);
};

// @desc    Delete a block
// @route   DELETE /api/v1/blocks/:id
// @access  Private
const deleteBlock = async (req: Request, res: Response) => {
	const { id } = req.params;

	const block = await Block.findById(id);
	if (!block) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error("Block not found");
	}

	// Check if the current user is the creator of the block
	if (!block.createdBy.equals(req.user)) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	await Block.deleteOne({ _id: id });
	res.status(StatusCodes.OK).json({ message: "Block deleted successfully" });
};

// @desc    Search blocks by title and sort by rating or views
// @route   GET /api/v1/blocks/search?title=<title>&sort=<rating|views>
// @access  Public
const searchBlocks = async (req: Request, res: Response) => {
	const { title, sort } = req.query;

	let blocks = await Block.find(
		{
			title: { $regex: title, $options: "i" },
		},
		"title tags price tier imageUrl createdBy"
	).populate("createdBy", "name email");

	if (sort === "rating") {
		blocks = blocks.sort((a, b) => b.rating - a.rating);
		// } else if (sort === "tags") {
		// 	blocks = blocks.sort((a, b) => a.tags.length - b.tags.length);
	} else if (sort === "views") {
		blocks = blocks.sort((a, b) => b.views - a.views);
	}

	res.status(StatusCodes.OK).json(blocks);
};

// @desc    Rate a block
// @route   POST /api/v1/blocks/:id/rate
// @access  Private
const rateBlock = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { rating } = req.body;

	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	const block = await Block.findById(id);
	if (!block) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error("Block not found");
	}

	if (block.tier == "paid") {
		if (!currentUser.blocksBought.includes(block._id)) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ msg: "You do not own this block. So you cannot rate it." });
		}
	}

	block.ratingTotal += rating;
	block.ratingCount += 1;
	// Update the rating of the block
	block.rating = (block.ratingTotal + rating) / (block.ratingCount + 1);
	await block.save();
	res.status(StatusCodes.OK).json(block);
};

// @desc    Favorite a block
// @route   POST /api/v1/blocks/:id/favorite
// @access  Private
const favoriteBlock = async (req: Request, res: Response) => {
	const { id } = req.params;

	const block = await Block.findById(id);
	if (!block) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error("Block not found");
	}

	// Add the block to the user's favorites
	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
      throw new Error("Not authorized");
	}

	currentUser.favorites.push(block._id);
	await currentUser.save();

	res.status(StatusCodes.OK).json(block);
};

// @desc    Get all favorited blocks
// @route   GET /api/v1/blocks/favorites
// @access  Private
const getFavoriteBlocks = async (req: Request, res: Response) => {
	const currentUser = await User.findById(req.user);

	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
      throw new Error("Not authorized");
	}

	const favoriteBlockIds = currentUser.favorites;

	const favoriteBlocks = await Block.find(
		{ _id: { $in: favoriteBlockIds } },
		"title tags price tier imageUrl createdBy"
	).populate("createdBy", "name email");

	res.status(StatusCodes.OK).json(favoriteBlocks);
};

// @desc    Get all blocks with a specific tag
// @route   GET /api/v1/blocks/tags/:tag
// @access  Public
const getBlocksByTag = async (req: Request, res: Response) => {
	const { tag } = req.params;
	const blocks = await Block.find(
		{ tags: tag },
		"title tags price tier imageUrl createdBy"
	).populate("createdBy", "name email");

	res.status(StatusCodes.OK).json(blocks);
};

export default {
	getAllBlocks,
	buyBlock,
	getBlockById,
	createBlock,
	updateBlock,
	deleteBlock,
	searchBlocks,
	rateBlock,
	favoriteBlock,
	getFavoriteBlocks, // Add the getFavoriteBlocks function
	getBlocksByTag,
};
