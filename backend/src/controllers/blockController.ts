import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Block from "../models/Block";
import { IBlock } from "../interfaces";
import User from "../models/User";
import quotes from "../utils/quotes";


function nl2br(str:string) {
	if (typeof str !== 'string') {
	  return '';
	}
	
	// Replace newlines with line break tags
	var breakTag ='<br/>';
	return str.replace(/(\r\n|\r|\n)/g, breakTag);
  }

// @desc    Get all blocks
// @route   POST /
// @access  Public
const getAllBlocks = async (req: Request, res: Response) => {
	const blocks = await Block.find(
		{},
		"title tags price tier imageUrl createdBy"
	).populate("createdBy", "name email"); // Populate the createdBy field with the name and email fields of the User model    res.status(StatusCodes.OK).json({count:blocks.length,blocks});
	res.status(StatusCodes.OK).json({ count: blocks.length, blocks });
};

// @desc    buy a paid block using gems
// @route   POST /buy/:id
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
	// if (!currentUser.userShelf.includes(block._id)) {
	// 	// Add block._id to the beginning of the array
	// 	currentUser.userShelf.unshift(block._id);
	// }

	if (block.tier == "free") {
		return res.status(StatusCodes.OK).json({
			msg: `Block ${block._id} is free and does not need to be purchased.`,
		});
	}

	if (currentUser.blocksBought.includes(block._id)) {
		res.status(StatusCodes.CONFLICT);
		throw new Error("Block has already been purchased");
	}

	if (currentUser.noOfGems < block.price && currentUser.role != "admin") {
		res.status(StatusCodes.EXPECTATION_FAILED);
		throw new Error("Not enough gems.");
	}

	if (currentUser.role != "admin") {
		currentUser.noOfGems -= block.price;
	}

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
// @route   GET /block/:id
// @access  Public
const getBlockById = async (req: Request, res: Response) => {
	const { id } = req.params;

	const currentUser = await User.findById(req.user);

	const block = await Block.findById(id).populate("createdBy", "name email");
	if (!block) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error("Block not found");
	}

	//update favorite tags, take this and put this when put shelf and fav

	if (currentUser) {
		const blockIdString = block._id.toString();

		// Filter out block._id from currentUser.userShelf
		const updatedUserShelf = currentUser.userShelf.filter(
			(itemId) => itemId.toString() !== blockIdString
		);

		// Add block._id at the beginning of the array
		updatedUserShelf.unshift(block._id);

		currentUser.userShelf = updatedUserShelf;

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

		await currentUser.save();
	}

	console.log(currentUser?.userShelf);

	block.views += 1;
	await block.save();

	let isFavorite = currentUser?.favorites.includes(block._id);
	let myRating = currentUser?.userRatings.find(
		(rating) => rating.blockInfo.toString() == id
	);

	if (block.tier === "paid") {
		if (!currentUser) {
			const limitedText = block.text.slice(0, 500); // Get the first 500 characters of the block text
			block.text = limitedText;
			return res.status(StatusCodes.OK).json({
				...block.toJSON(),
				fullBlock: false,
				isFavorite,
				myRating,
			});
		} else if (
			currentUser.blocksBought.includes(block._id) ||
			currentUser.myBlocks.includes(block._id)
		) {
			return res
				.status(StatusCodes.OK)
				.json({ ...block.toJSON(), fullBlock: true, isFavorite, myRating });
		} else {
			const limitedText = block.text.slice(0, 500); // Get the first 500 characters of the block text
			block.text = limitedText;
			return res.status(StatusCodes.OK).json({
				...block.toJSON(),
				fullBlock: false,
				isFavorite,
				myRating,
			});
		}
	}

	return res
		.status(StatusCodes.OK)
		.json({ ...block.toJSON(), fullBlock: true, isFavorite, myRating });
};

// @desc    Create a block
// @route   POST /
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

	//checks for paid blocks
	if (price != 0) {
		if (price < 0 || !Number.isInteger(price)) {
			res.status(StatusCodes.BAD_REQUEST);
			throw new Error("Price must be an integer greater than or equal to 0");
		}

		let paidBlockCost: number = Number(process.env.PAID_BLOCK_COST);

		if (
			currentUser.tier != "premium" &&
			currentUser.noOfGems < paidBlockCost &&
			currentUser.role != "admin"
		) {
			// if (currentUser.noOfGems < paidBlockCost && currentUser.role != "admin") {
			res.status(StatusCodes.EXPECTATION_FAILED);
			throw new Error("Not enough gems.");
		}

		if (text.length < 500) {
			res.status(StatusCodes.EXPECTATION_FAILED);
			throw new Error(
				"Paid Blocks must be a minimum of 500 characters long"
			);
		}
	}

	// when putting our info allow rating, rating count, rating total, views and favorite count
	const block = await Block.create({
		title,
		tags,
		imageUrl,
		text,
		price,
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
// @route   PUT /:id
// @access  Private
const updateBlock = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, tags, imageUrl, text, price, tier } = req.body;

	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

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
	if (!block.createdBy.equals(req.user) && currentUser.role != "admin") {
		// console.log("this piece");
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	if (price != 0) {
		if (price < 0 || !Number.isInteger(price)) {
			res.status(StatusCodes.BAD_REQUEST);
			throw new Error("Price must be an integer greater than or equal to 0");
		}

		// let paidBlockCost: number = Number(process.env.PAID_BLOCK_COST);
		// if (currentUser.noOfGems < paidBlockCost && currentUser.role != "admin") {
		// 	res.status(StatusCodes.EXPECTATION_FAILED);
		// 	throw new Error("Not enough gems.");
		// }

		if (text.length < 500) {
			res.status(StatusCodes.EXPECTATION_FAILED);
			throw new Error(
				"Paid Blocks must be a minimum of 500 characters long"
			);
		}
	}

	block.title = title;
	block.tags = tags;
	block.imageUrl = imageUrl;
	block.text = text;
	block.price = price;
	block.tier = price == 0 ? "free" : "paid";

	await block.save();
	res.status(StatusCodes.OK).json(block);
};

// @desc    Delete a block
// @route   DELETE /:id
// @access  Private
const deleteBlock = async (req: Request, res: Response) => {
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

	// Check if the current user is the creator of the block
	if (!block.createdBy.equals(req.user) && currentUser.role != "admin") {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	await Block.deleteOne({ _id: id });
	res.status(StatusCodes.OK).json({ message: "Block deleted successfully" });
};

// @desc    Search blocks by title and sort by rating or views with pagination
// @route   POST /search?title=<title>&sort=<ratingDesc|ratingAsc|viewsDesc|viewsAsc>&page=<pageNumber>&limit=<pageSize>
// @access  Public
const searchBlocks = async (req: Request, res: Response) => {
	// Extract query parameters
	const { title, tag, sort, page, limit } = req.query;

	if (
		typeof title !== "string" ||
		typeof tag !== "string" ||
		typeof sort !== "string" ||
		typeof page !== "string" ||
		typeof limit !== "string"
	) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error("Invalid query parameters");
	}

	if (title == "noSearch" && tag == "noSearch") {
		return res.status(StatusCodes.OK).json({
			blocks: [],
			page: 0,
			totalPages: 0,
			totalItems: 0,
		});
	}
	// Parse page number and page size from query parameters
	const pageNumber = parseInt(page) || 1;
	const pageSize = parseInt(limit) || 10;

	// Build search query
	const searchQuery: any = {};

	// Add tag filter to the search query if provided
	if (tag != "all") {
		searchQuery.tags = { $in: [tag] };
	}

	console.log(title);
	console.log(tag);
	console.log(sort);
	// console.log(sort)
	// Check if title is provided and not empty
	if (title.trim() !== "") {
		console.log("here 1");
		searchQuery.title = { $regex: title, $options: "i" };
	}

	// Add tag filter to the search query if provided
	if (tag != "all") {
		searchQuery.tags = { $in: [tag] };
	}

	// Start with the base query to find blocks matching the search query
	let query = Block.find(
		searchQuery,
		"title tags price tier imageUrl createdBy tier views favoriteCount rating"
	).populate("createdBy", "name email");

	// Apply sorting based on the 'sort' parameter
	if (sort === "ratingDesc") {
		query = query.sort({ rating: -1, views: -1 });
	} else if (sort === "ratingAsc") {
		query = query.sort({ rating: 1, views: -1 });
	} else if (sort === "viewsDesc") {
		query = query.sort({ views: -1, rating: -1 });
	} else if (sort === "viewsAsc") {
		query = query.sort({ views: 1, rating: -1 });
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
// @route   POST /:id/rate
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
			res.status(StatusCodes.UNAUTHORIZED);
			throw new Error("You do not own this block, so you cannot rate it");
		}
	}

	block.ratingTotal += rating;
	block.ratingCount += 1;
	// Update the rating of the block
	block.rating = (block.ratingTotal + rating) / (block.ratingCount + 1);

	//enter rating in userRating
	// Remove elements from currentUser.userRatings with currentUser.userRatings.BlockInfo = block._id
	currentUser.userRatings = currentUser.userRatings.filter(
		(rating) => rating.blockInfo !== block._id
	);

	currentUser.userRatings.unshift({ blockInfo: block._id, rating });

	await block.save();
	await currentUser.save();
	res.status(StatusCodes.OK).json(block);
};

// @desc    Favorite a block
// @route   POST /:id/favorite
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

	const favoriteIndex = currentUser.favorites.indexOf(block._id);
	if (favoriteIndex !== -1) {
		// Block already exists in favorites, remove it
		currentUser.favorites.splice(favoriteIndex, 1);
		block.favoriteCount -= 1;
	} else {
		// Add the block to the user's favorites
		currentUser.favorites.unshift(block._id);
		block.favoriteCount += 1;

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
	}
	//update favorite tags, take this and put this when put shelf and fav

	await currentUser.save();

	res.status(StatusCodes.OK).json(block);
};

// @desc    Get all favorited blocks
// @route   GET /favorites?page=<page_number>&limit=<limit_per_page>
// @access  Private
const getFavoriteBlocks = async (req: Request, res: Response) => {
	const currentUser = await User.findById(req.user);

	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	const favoriteBlockIds = currentUser.favorites;

	const page = parseInt(req.query.page as string) || 1; // Get the current page from query parameters
	const limit = parseInt(req.query.limit as string) || 10; // Set the limit per page from query parameters
	const skip = (page - 1) * limit; // Calculate the number of documents to skip

	const favoriteBlocks = await Block.find({
		_id: { $in: favoriteBlockIds },
	})
		.select("title tags price tier imageUrl createdBy")
		.populate("createdBy", "name email") // Populate createdBy field with name and email
		.exec(); // Execute the query to get the blocks

	// Sort the blocks based on the order of blockIds
	const sortedBlocks = favoriteBlockIds.map((id) =>
		favoriteBlocks.find((block) => block._id.toString() === id.toString())
	);

	const paginatedBlocks = sortedBlocks.slice(skip, skip + limit); // Get the blocks for the current page
	const totalPages = Math.ceil(sortedBlocks.length / limit);

	res.status(StatusCodes.OK).json({
		currentPage: page,
		totalPages,
		blocks: paginatedBlocks,
	});
};

// @desc    Get all blocks with a specific tag
// @route   GET /tags/:tag?page=<page_number>&limit=<limit_per_page>
// @access  Public
const getBlocksByTag = async (req: Request, res: Response) => {
	const { tag } = req.params;

	const page = parseInt(req.query.page as string) || 1; // Get the current page from query parameters
	const limit = parseInt(req.query.limit as string) || 10; // Set the limit per page from query parameters
	const skip = (page - 1) * limit; // Calculate the number of documents to skip

	const blocks = await Block.find(
		{ tags: tag },
		"title tags price tier imageUrl createdBy"
	)
		.populate("createdBy", "name email")
		.skip(skip)
		.limit(limit);

	const totalBlocks = await Block.countDocuments({ tags: tag });

	const totalPages = Math.ceil(totalBlocks / limit);

	res.status(StatusCodes.OK).json({ currentPage: page, totalPages, blocks });
};

// @desc    Get all blocks created by the current user
// @route   GET /my-blocks?page=<page_number>&limit=<limit_per_page>&sortBy=<sort_field>&sortOrder=<asc_or_desc>
// @access  Private
const getMyBlocks = async (req: Request, res: Response) => {
	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	const userId = req.user; // Assuming the current user ID is available in the req.user property
	const page = parseInt(req.query.page as string) || 1; // Get the current page from query parameters
	const limit = parseInt(req.query.limit as string) || 10; // Set the limit per page from query parameters
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
		sortOptions = { createdAt: sortOrder === "asc" ? 1 : -1 };
	}

	const skip = (page - 1) * limit; // Calculate the number of documents to skip

	const blocks = await Block.find(
		{ createdBy: userId },
		"title tags price tier imageUrl createdBy views favoriteCount rating createdAt updatedAt"
	)
		.populate("createdBy", "name email")
		.sort(sortOptions)
		.skip(skip)
		.limit(limit);

	const totalBlocks = await Block.countDocuments({ createdBy: userId });

	const totalPages = Math.ceil(totalBlocks / limit);

	res.status(StatusCodes.OK).json({ currentPage: page, totalPages, blocks });
};

// @desc    Get all blocks in the UserShelf of the current user
// @route   GET /user-shelf?page=<page_number>&limit=<limit_per_page>
// @access  Private
const getUserShelfBlocks = async (req: Request, res: Response) => {
	// Retrieve the current user
	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	// Retrieve the blocks in the UserShelf
	// const blockIds = currentUser.userShelf;
	const blockIds = currentUser.userShelf.filter(
		(id) => !currentUser.myBlocks.includes(id)
	);

	console.log(blockIds);
	const page = parseInt(req.query.page as string) || 1; // Get the current page from query parameters
	const limit = parseInt(req.query.limit as string) || 10; // Set the limit per page from query parameters
	const skip = (page - 1) * limit; // Calculate the number of documents to skip

	const blocks = await Block.find({
		_id: { $in: blockIds },
	})
		.select("title tags price tier imageUrl createdBy")
		.populate("createdBy", "name email") // Populate createdBy field with name and email
		.exec(); // Execute the query to get the blocks

	// Sort the blocks based on the order of blockIds
	const sortedBlocks = blockIds.map((id) =>
		blocks.find((block) => block._id.toString() === id.toString())
	);

	const paginatedBlocks = sortedBlocks.slice(skip, skip + limit); // Get the blocks for the current page
	const totalPages = Math.ceil(sortedBlocks.length / limit);

	res.status(StatusCodes.OK).json({
		currentPage: page,
		totalPages,
		blocks: paginatedBlocks,
	});
};

//   @desc    Get home page information
//   @route   GET /home
//   @access  Public
const getHomePage = async (req: Request, res: Response) => {
	const currentUser = await User.findById(req.user);

	const homePageData: any = {};

	if (currentUser) {
		const continueReadingBlocks = await Block.find({
			_id: { $in: currentUser.userShelf },
		})
			.populate("createdBy", "name email")
			.limit(5);

		const favoriteTags = currentUser.favoriteTags.slice(0, 3);
		const favTagsBlocks = await Promise.all(
			favoriteTags.map(async (tag) => {
				const blocks = await Block.find({ tags: tag })
					.sort({ rating: -1 })
					.limit(10)
					.populate("createdBy", "name email");
				return { tag, blocks };
			})
		);

		homePageData.continueReading = continueReadingBlocks;
		homePageData.favtags = favTagsBlocks;
	}

	const popularBlocks = await Block.find()
		.sort({ views: -1 })
		.limit(10)
		.populate("createdBy", "name email");

	const bestRatedBlocks = await Block.find()
		.sort({ rating: -1 })
		.limit(10)
		.populate("createdBy", "name email");

	homePageData.popular = popularBlocks;
	homePageData.bestRated = bestRatedBlocks;

	res.status(StatusCodes.OK).json(homePageData);
};

//   @desc    Get home page information
//   @route   GET /dashboard
//   @access  Public
const getDashboard = async (req: Request, res: Response) => {
	// console.log("req.user", req.user)
	// console.log("req.user", req.signedCookies)

	// const currentDate = new Date().toISOString().split("T")[0]; // Get the current date
	// const quoteIndex = currentDate.length % (quotes.length - 1); // Calculate the index based on the date
	const quote = quotes[new Date().getDate()]; // Access the quote at the calculated index

	const newArrivals = await Block.find()
		.sort({ createdAt: -1 })
		.limit(15)
		.select("title tier imageUrl"); // Get the last 15 blocks added, only include title, tier, and imageUrl fields

	let recommendedBlocks = [];

	if (req.user) {
		// User is logged in
		const currentUser = await User.findById(req.user);

		if (currentUser) {
			// Get the user's top 5 favorite tags
			const favoriteTags = currentUser.favoriteTags
				.sort((a, b) => b.count - a.count)
				.slice(0, 5)
				.map((tag) => tag.tagName);

			// Get 30 random blocks with a rating > 3 and matching the user's favorite tags
			recommendedBlocks = await Block.aggregate([
				{ $match: { rating: { $gte: 2.5 }, tags: { $in: favoriteTags } } },
				{ $sample: { size: 30 } },
				{ $project: { title: 1, tier: 1, imageUrl: 1 } }, // Include only title, tier, and imageUrl fields
			]);

			if (recommendedBlocks.length < 5) {
				recommendedBlocks = await Block.aggregate([
					{ $match: { rating: { $gte: 2.5 } } },
					{ $sample: { size: 30 } },
					{ $project: { title: 1, tier: 1, imageUrl: 1 } }, // Include only title, tier, and imageUrl fields
				]);
			}
		}
	} else {
		// User is not logged in
		// Get 30 random blocks with a rating > 3
		recommendedBlocks = await Block.aggregate([
			{ $match: { rating: { $gte: 2.5 } } },
			{ $sample: { size: 30 } },
			{ $project: { title: 1, tier: 1, imageUrl: 1 } }, // Include only title, tier, and imageUrl fields
		]);
	}

	res.status(StatusCodes.OK).json({
		quote,
		newArrivals,
		recommendedBlocks,
	});
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
	getUserShelfBlocks,
	getHomePage,
	getDashboard,
};
