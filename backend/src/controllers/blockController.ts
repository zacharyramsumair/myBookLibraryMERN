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

	//addBlock to the top of userShelf
	if (!currentUser.userShelf.includes(block._id)) {
		// Add block._id to the beginning of the array
		currentUser.userShelf.unshift(block._id);
	}

	if (block.tier == "free") {
		return res.status(StatusCodes.OK).json({
			msg: `Block ${block._id} is free and does not need to be purchased.`,
		});
	}

	if (currentUser.blocksBought.includes(block._id)) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error("Block has already been purchased");
	}

	if (currentUser.noOfGems < block.price) {
		res.status(StatusCodes.EXPECTATION_FAILED);
		throw new Error("Not enough gems.");
	}
	currentUser.noOfGems -= block.price;
	currentUser.blocksBought.push(block._id);

	//update favorite tags, take this and put this when put shelf and fav

	block.tags.forEach((tagName) => {
		const tagIndex = currentUser.favoriteTags.findIndex(
			(tag) => tag.tagName === tagName
		);

		//increment by 5 since its a purchase, 1 for view, 3 for add to bookshelf and 10 for favorite and for creating a Block with this tag

		if (tagIndex !== -1) {
			// Tag already exists, update the count
			currentUser.favoriteTags[tagIndex].count += 5;
		} else {
			// Tag does not exist, add it to the array
			currentUser.favoriteTags.push({ tagName, count: 5 });
		}
	});

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

	//update favorite tags, take this and put this when put shelf and fav

	block.tags.forEach((tagName) => {
		const tagIndex = currentUser.favoriteTags.findIndex(
			(tag) => tag.tagName === tagName
		);

		//increment by 5 since its a purchase, 1 for view, 3 for add to bookshelf and 10 for favorite and for creating a Block with this tag

		if (tagIndex !== -1) {
			// Tag already exists, update the count
			currentUser.favoriteTags[tagIndex].count += 1;
		} else {
			// Tag does not exist, add it to the array
			currentUser.favoriteTags.push({ tagName, count: 1 });
		}
	});

	// Move block._id to the top of the array
	currentUser.userShelf = [
		block._id,
		...currentUser.userShelf.filter((itemId) => itemId !== block._id),
	];

	await currentUser.save();

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

	//update favorite tags, take this and put this when put shelf and fav

	block.tags.forEach((tagName) => {
		const tagIndex = currentUser.favoriteTags.findIndex(
			(tag) => tag.tagName === tagName
		);

		//increment by 5 since its a purchase, 1 for view, 3 for add to bookshelf and 10 for favorite and for creating a Block with this tag

		if (tagIndex !== -1) {
			// Tag already exists, update the count
			currentUser.favoriteTags[tagIndex].count += 10;
		} else {
			// Tag does not exist, add it to the array
			currentUser.favoriteTags.push({ tagName, count: 10 });
		}
	});

	await currentUser.save();

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

// @desc    Search blocks by title and sort by rating or views with pagination
// @route   GET /api/v1/blocks/search?title=<title>&sort=<ratingDesc|ratingAsc|viewsDesc|viewsAsc>&page=<pageNumber>&limit=<pageSize>
// @access  Public
const searchBlocks = async (req: Request, res: Response) => {
	// Extract query parameters
	const { title, sort, page, limit } = req.query;
  
	if (
	  typeof title !== "string" ||
	  typeof sort !== "string" ||
	  typeof page !== "string" ||
	  typeof limit !== "string"
	) {
	  res.status(StatusCodes.BAD_REQUEST);
	  throw new Error("Invalid query parameters");
	}
  
	// Parse page number and page size from query parameters
	const pageNumber = parseInt(page) || 1;
	const pageSize = parseInt(limit) || 10;
  
	// Build search query
	const searchQuery = {
	  title: { $regex: title, $options: "i" },
	};
  
	// Start with the base query to find blocks matching the search query
	let query = Block.find(
	  searchQuery,
	  "title tags price tier imageUrl createdBy"
	).populate("createdBy", "name email");
  
	// Apply sorting based on the 'sort' parameter
	if (sort.startsWith("rating")) {
	  query = query.sort({ rating: sort === "ratingDesc" ? -1 : 1 });
	} else if (sort.startsWith("views")) {
	  query = query.sort({ views: sort === "viewsDesc" ? -1 : 1 });
	}
  
	// Count total items matching the search query
	const totalItems = await Block.countDocuments(searchQuery);
  
	// Calculate total pages based on page size
	const totalPages = Math.ceil(totalItems / pageSize);
  
	// Apply pagination to the query
	query = query.skip((pageNumber - 1) * pageSize).limit(pageSize);
  
	// Execute the query and retrieve blocks
	const blocks = await query.exec();
  
	// Return the blocks along with pagination information in the response
	res.status(StatusCodes.OK).json({
	  blocks,
	  page: pageNumber,
	  totalPages,
	  totalItems,
	});
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

	//update favorite tags, take this and put this when put shelf and fav

	block.tags.forEach((tagName) => {
		const tagIndex = currentUser.favoriteTags.findIndex(
			(tag) => tag.tagName === tagName
		);

		//increment by 5 since its a purchase, 1 for view, 3 for add to bookshelf and 10 for favorite and for creating a Block with this tag

		if (tagIndex !== -1) {
			// Tag already exists, update the count
			currentUser.favoriteTags[tagIndex].count += 10;
		} else {
			// Tag does not exist, add it to the array
			currentUser.favoriteTags.push({ tagName, count: 10 });
		}
	});

	await currentUser.save();

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

// @desc    Get all blocks created by the current user
// @route   GET /api/v1/blocks/my-blocks
// @access  Private
const getMyBlocks = async (req: Request, res: Response) => {
	const userId = req.user; // Assuming the current user ID is available in the req.user property
	const sortBy = req.query.sortBy || "createdDate"; // Default sorting by creation date if not provided
	const sortOrder = req.query.sortOrder || "desc"; // Default sorting order is descending if not provided
  
	let sortOptions = {};
  
	if (sortBy === "lastUpdated") {
	  sortOptions = { updatedAt: sortOrder === "asc" ? 1 : -1 };
	} else if (sortBy === "rating") {
	  sortOptions = { rating: sortOrder === "asc" ? 1 : -1 };
	} else if (sortBy === "views") {
	  sortOptions = { views: sortOrder === "asc" ? 1 : -1 };
	} else {
	  // Sort by creation date (default)
	  sortOptions = { createdDate: sortOrder === "asc" ? 1 : -1 };
	}
  
	const blocks = await Block.find(
	  { createdBy: userId },
	  "title tags price tier imageUrl createdBy"
	)
	  .sort(sortOptions)
	  .exec();
  
	res.status(StatusCodes.OK).json({ count: blocks.length, blocks });
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
	getMyBlocks,
};
