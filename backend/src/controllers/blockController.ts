import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Block from "../models/Block";
import { IBlock } from "../interfaces";
import User from "../models/User";

// @desc    Get all blocks
// @route   GET /api/v1/blocks
// @access  Public
const getAllBlocks = async (req: Request, res: Response) => {
	try {
		const blocks = await Block.find();
		res.status(StatusCodes.OK).json(blocks);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: "Server error",
		});
	}
};

// @desc    Get a specific block by ID
// @route   GET /api/v1/blocks/:id
// @access  Public
const getBlockById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const block = await Block.findById(id);
		if (!block) {
			res.status(StatusCodes.NOT_FOUND).json({ error: "Block not found" });
		} else {
			res.status(StatusCodes.OK).json(block);
		}
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: "Server error",
		});
	}
};

// @desc    Create a block
// @route   POST /api/v1/blocks
// @access  Private
const createBlock = async (req: Request, res: Response) => {
	const { title, tags, price, imageUrl, text, tier } = req.body;
	try {
		const block = await Block.create({
			title,
			tags,
			imageUrl,
			text,
			price: 0,
			tier,
			createdBy: req.user, // Assuming the user ID is stored in req.user.userId
		});
		await block.save();
		res.status(StatusCodes.CREATED).json(block);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: "Server error",
		});
	}
};

// @desc    Create a premium block
// @route   POST /api/v1/blocks/premium
// @access  Private
const createPremiumBlock = async (req: Request, res: Response) => {
	const { title, tags, rating, imageUrl, text } = req.body;
	try {
		const user = req.user; // Assuming the user ID is stored in req.user.userId

		// Check if the user has enough gems to create a premium block
		const currentUser = await User.findById(user);
		if (!currentUser || currentUser.noOfGems < 1) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ error: "Insufficient gems" });
		}

		const block = await Block.create({
			title,
			tags,
			rating,
			imageUrl,
			text,
			views: 0,
			price: 0,
			tier: "premium",
			createdBy: user,
		});
		await block.save();

		// Decrease the number of gems for the user
		currentUser.noOfGems -= 1;
		await currentUser.save();

		res.status(StatusCodes.CREATED).json(block);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: "Server error",
		});
	}
};

// @desc    Update a block
// @route   PUT /api/v1/blocks/:id
// @access  Private
const updateBlock = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, tags, imageUrl, text } = req.body;
	
		const block = await Block.findById(id);
		if (!block) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: "Block not found" });
		}

		// Check if the current user is the creator of the block
		if (!block.createdBy.equals(req.user)) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ error: "Not authorized" });
		}

		block.title = title;
		block.tags = tags;
		block.imageUrl = imageUrl;
		block.text = text;

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
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Block not found" });
      }
  
      // Check if the current user is the creator of the block
      if (!block.createdBy.equals(req.user)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Not authorized" });
      }
  
      await Block.deleteOne({ _id: id });
      res.status(StatusCodes.OK).json({ message: "Block deleted successfully" });
   
  };

// @desc    Search blocks by title and sort by rating, tags, or views
// @route   GET /api/v1/blocks/search?title=<title>&sort=<rating|tags|views>
// @access  Public
const searchBlocks = async (req: Request, res: Response) => {
	const { title, sort } = req.query;
	try {
		let blocks = await Block.find({
			title: { $regex: title, $options: "i" },
		});

		if (sort === "rating") {
			blocks = blocks.sort((a, b) => b.rating - a.rating);
		} else if (sort === "tags") {
			blocks = blocks.sort((a, b) => a.tags.length - b.tags.length);
		} else if (sort === "views") {
			blocks = blocks.sort((a, b) => b.views - a.views);
		}

		res.status(StatusCodes.OK).json(blocks);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: "Server error",
		});
	}
};

// @desc    Rate a block
// @route   POST /api/v1/blocks/:id/rate
// @access  Private
const rateBlock = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { rating } = req.body;
	try {
		const block = await Block.findById(id);
		if (!block) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: "Block not found" });
		}

		// Update the rating of the block
		block.rating = rating;
		await block.save();

		res.status(StatusCodes.OK).json(block);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: "Server error",
		});
	}
};

// @desc    Favorite a block
// @route   POST /api/v1/blocks/:id/favorite
// @access  Private
const favoriteBlock = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const block = await Block.findById(id);
		if (!block) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: "Block not found" });
		}

		// Add the block to the user's favorites
		const user = req.user;
		const currentUser = await User.findById(user);
		if (!currentUser) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ error: "User not found" });
		}

		currentUser.favorites.push(block._id);
		await currentUser.save();

		res.status(StatusCodes.OK).json(block);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: "Server error",
		});
	}
};

export default {
	getAllBlocks,
	getBlockById,
	createBlock,
	createPremiumBlock,
	updateBlock,
	deleteBlock,
	searchBlocks,
	rateBlock,
	favoriteBlock,
};
