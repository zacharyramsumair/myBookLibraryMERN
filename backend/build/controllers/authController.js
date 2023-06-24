"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const User_1 = __importDefault(require("../models/User"));
const Token_1 = __importDefault(require("../models/Token"));
const jwt_1 = require("../utils/jwt");
const crypto_1 = __importDefault(require("crypto"));
const sendVerficationEmail_1 = __importDefault(require("../utils/sendVerficationEmail"));
const app_1 = require("../app");
const xss_1 = require("xss");
const sendResetPasswordEmail_1 = __importDefault(require("../utils/sendResetPasswordEmail"));
const createHash_1 = __importDefault(require("../utils/createHash"));
const stripe_1 = require("../utils/stripe");
const date_fns_1 = require("date-fns");
//base url '/api/v1/auth'
// @desc    Register new user
// @route   POST /
// @access  Public
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, name, password } = req.body;
    if (!email || !name || !password) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
        throw new Error("Please provide all values");
    }
    email = (0, xss_1.filterXSS)(email, app_1.xssOptions);
    email = email.toLowerCase();
    name = (0, xss_1.filterXSS)(name, app_1.xssOptions);
    password = (0, xss_1.filterXSS)(password, app_1.xssOptions);
    const user = yield User_1.default.findOne({ email });
    if (user && user.isVerified) {
        res.status(http_status_codes_1.StatusCodes.CONFLICT);
        throw new Error("Email already exists");
    }
    const verificationToken = crypto_1.default.randomBytes(40).toString("hex");
    if (user) {
        // Update existing user with the new verification token
        user.name = name;
        user.password = password;
        user.verificationToken = verificationToken;
        yield user.save();
    }
    else {
        const customer = yield stripe_1.stripe.customers.create({
            email,
        }, {
            apiKey: process.env.STRIPE_SECRET_KEY,
        });
        // Create a new user with the provided email
        yield User_1.default.create({
            name,
            email,
            password,
            verificationToken,
            stripeCustomerId: customer.id,
        });
    }
    yield (0, sendVerficationEmail_1.default)({
        name,
        email,
        verificationToken,
        origin: process.env.EMAIL_ORIGIN,
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg: "Success! Please check your email to verify the account",
    });
});
// @desc    Verify a user's email
// @route   PUT /verify-email
// @access  Public
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { verificationToken, email } = req.body;
    email = (0, xss_1.filterXSS)(email, app_1.xssOptions);
    verificationToken = (0, xss_1.filterXSS)(verificationToken, app_1.xssOptions);
    email = email.toLowerCase();
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error("Verification Failed");
        return;
    }
    if (user.isVerified) {
        res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Email already Verified" });
        return;
    }
    if (user.verificationToken !== verificationToken) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error("Verification Failed token");
        return;
    }
    user.isVerified = true;
    user.verified = new Date();
    user.verificationToken = "";
    yield user.save();
    // res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Email Verified" });
    return;
});
// @desc    Login a user
// @route   POST /login
// @access  Public
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.cookie("XSRF-TOKEN", req.csrfToken());
    let { email, password } = req.body;
    email = (0, xss_1.filterXSS)(email, app_1.xssOptions);
    email = email.toLowerCase();
    password = (0, xss_1.filterXSS)(password, app_1.xssOptions);
    if (!email || !password) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
        throw new Error("Please provide email and password");
    }
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error("Invalid email or password");
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error("Invalid email or password");
    }
    if (!user.isVerified) {
        const verificationToken = crypto_1.default.randomBytes(40).toString("hex");
        // Update existing user with the new verification token
        user.verificationToken = verificationToken;
        yield user.save();
        yield (0, sendVerficationEmail_1.default)({
            name: user.name,
            email,
            verificationToken,
            origin: process.env.EMAIL_ORIGIN,
        });
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error("Please verify your email");
    }
    const tokenUser = {
        name: user.name,
        user: user._id,
        role: user.role,
        tier: user.tier,
    };
    let refreshToken = "";
    // check for existing token
    const existingToken = yield Token_1.default.findOne({ user: user._id });
    if (existingToken) {
        const { isValid } = existingToken;
        if (!isValid) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
            throw new Error("This account has been banned for suspicious activity");
        }
        refreshToken = existingToken.refreshToken;
        (0, jwt_1.attachCookiesToResponse)({ res, user: user._id, refreshToken });
        res.status(http_status_codes_1.StatusCodes.OK).json({ user: tokenUser });
        return;
    }
    refreshToken = crypto_1.default.randomBytes(40).toString("hex");
    const userAgent = req.headers["user-agent"];
    const ip = req.ip;
    const userToken = { refreshToken, userAgent, ip, user: user._id };
    yield Token_1.default.create(userToken);
    (0, jwt_1.attachCookiesToResponse)({ res, user: user._id, refreshToken });
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: tokenUser });
});
// const showCurrentUser = async (req: Request, res: Response) => {
// 	// console.log("showcurrent", req.user)
// 	const currentUser = await User.findById(req.user);
// 	if (!currentUser) {
// 		res.status(StatusCodes.UNAUTHORIZED);
// 		throw new Error("Not authorized");
// 	}
// 	const user = await User.findOne({ _id: req.user });
// 	if (!user) {
// 		res.status(StatusCodes.NOT_FOUND);
// 		throw new Error("User not found");
// 	}
// 	const {
// 		name,
// 		email,
// 		_id: id,
// 		role,
// 		tier,
// 		profilePic,
// 		noOfGems,
// 		lastGemIncrement,
// 	} = user;
// 	const currentDate = new Date();
// 	const startOfCurrentMinute = startOfMinute(currentDate); // Calculate the start of the current minute
// 	// Check if the last gem increment was in a previous minute
// 	if (!lastGemIncrement || startOfCurrentMinute > lastGemIncrement) {
// 		// Increment the noOfGems by 20
// 		if (user.tier == "standard" || user.tier == "premium") {
// 			const minutesPassed = differenceInMinutes(startOfCurrentMinute, lastGemIncrement); // Calculate the number of minutes passed since the last increment
// 			const gemsIncrement = Math.floor(minutesPassed / 1); // Increment the gems by 1 for every minute passed
// 			user.noOfGems += gemsIncrement;
// 			user.lastGemIncrement = startOfCurrentMinute;
// 			await user.save();
// 		}
// 	}
// 	res.status(StatusCodes.OK).json({
// 		name,
// 		email,
// 		id,
// 		role,
// 		tier,
// 		profilePic,
// 		noOfGems,
// 	});
// 	// res.status(StatusCodes.OK).json({ user });
// };
// @desc    Get user data
// @route   GET /showCurrentUser
// @access  Private
const showCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield User_1.default.findById(req.user);
    if (!currentUser) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error("Not authorized");
    }
    const user = yield User_1.default.findOne({ _id: req.user });
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error("User not found");
    }
    const { name, email, _id: id, role, tier, profilePic, noOfGems, lastGemIncrement, nextGemIncrement, } = user;
    const subscription = yield stripe_1.stripe.subscriptions.list({
        customer: currentUser.stripeCustomerId,
    });
    if (subscription.data.length > 0) {
        if (subscription.data[0].items.data[0].price.product ==
            "prod_O701d8QfGkpAAf") {
            user.tier = "premium";
        }
        else if (subscription.data[0].items.data[0].price.product ==
            "prod_O7Gr7q0NmZpSzN") {
            user.tier = "standard";
        }
        else {
            user.tier = "free";
        }
    }
    else {
        user.tier = "free";
    }
    // subscription.data[0].items.data.price.product
    // pre prod_O701d8QfGkpAAf
    // standard  prod_O7Gr7q0NmZpSzN
    const currentDate = new Date();
    const startOfCurrentDay = (0, date_fns_1.startOfDay)(currentDate);
    // Check if the last gem increment was in a previous month
    if (!lastGemIncrement || startOfCurrentDay >= nextGemIncrement) {
        // Increment the noOfGems by 20
        // rework so that it goes up by the number of months passed, incase you didn't sign in for a few months
        if (user.tier == "standard" || user.tier == "premium") {
            user.noOfGems += 20;
            user.lastGemIncrement = startOfCurrentDay;
            user.nextGemIncrement = (0, date_fns_1.addDays)(startOfCurrentDay, 31);
        }
    }
    yield user.save();
    yield currentUser.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        name,
        email,
        id,
        role,
        tier,
        profilePic,
        noOfGems,
    });
});
// @desc    Logout User
// @route   DELETE /logout
// @access  Private
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield User_1.default.findById(req.user);
    if (!currentUser) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error("Not authorized");
    }
    yield Token_1.default.findOneAndDelete({ user: req.user });
    res.cookie("accessToken", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.cookie("refreshToken", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "user logged out!" });
});
// @desc    Send email to reset password
// @route   POST /forgot-password
// @access  Public
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email } = req.body;
    if (!email) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
        throw new Error("Please provide valid email");
    }
    email = email.toLowerCase();
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        // sent the same message so hackers can't use here to check which emails are in our database
        setTimeout(() => {
            res.status(http_status_codes_1.StatusCodes.OK).json({
                msg: "Please check your email for reset password link",
            });
        }, 2500); // Delay of 2 seconds (2000 milliseconds)
        return; // Return from the function to prevent further execution
    }
    if (user) {
        const passwordToken = crypto_1.default.randomBytes(70).toString("hex");
        // send email
        yield (0, sendResetPasswordEmail_1.default)({
            name: user.name,
            email: user.email,
            token: passwordToken,
            origin: process.env.EMAIL_ORIGIN,
        });
        const tenMinutes = 1000 * 60 * 10;
        const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
        user.passwordToken = (0, createHash_1.default)(passwordToken);
        user.passwordTokenExpirationDate = passwordTokenExpirationDate;
        yield user.save();
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "Please check your email for reset password link",
    });
});
// @desc    Form to change your password
// @route   PUT /reset-password
// @access  Public
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { token, email, password } = req.body;
    if (!token || !email || !password) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
        throw new Error("Please provide all values");
    }
    email = email.toLowerCase();
    const user = yield User_1.default.findOne({ email });
    if (user) {
        const currentDate = new Date();
        if (user.passwordToken === (0, createHash_1.default)(token) &&
            user.passwordTokenExpirationDate &&
            user.passwordTokenExpirationDate > currentDate) {
            user.password = password;
            user.passwordToken = null;
            user.passwordTokenExpirationDate = null;
            yield user.save();
        }
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Password Reset" });
});
// @desc    Edit user settings page
// @route   PUT /profile
// @access  Private
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, birthday, location, aboutMe, website, showFavoriteTags, showFavorites, profilePic, } = req.body;
    const currentUser = yield User_1.default.findById(req.user);
    if (!currentUser) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error("Not authorized");
    }
    // console.log(currentUser.birthday);
    // console.log(birthday);
    currentUser.name = name;
    currentUser.birthday = birthday;
    currentUser.location = location;
    currentUser.aboutMe = aboutMe;
    currentUser.website = website;
    currentUser.showFavoriteTags = showFavoriteTags;
    currentUser.showFavorites = showFavorites;
    currentUser.profilePic = profilePic;
    yield currentUser.save();
    return res.json(currentUser);
});
// @desc    Get profile info to populate edit page
// @route   GET /userprofile
// @access  private
const getMyProfilePageForEditing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield User_1.default.findById(req.user);
    if (!currentUser) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error("Not authorized");
    }
    const subscription = yield stripe_1.stripe.subscriptions.list({
        customer: currentUser.stripeCustomerId,
    });
    // res.json({msg:"your really should see this"})
    res.json({
        name: currentUser.name,
        birthday: currentUser.birthday,
        location: currentUser.location,
        aboutMe: currentUser.aboutMe,
        website: currentUser.website,
        showFavoriteTags: currentUser.showFavoriteTags,
        showFavorites: currentUser.showFavorites,
        profilePic: currentUser.profilePic,
        subscription,
    });
});
// @desc    Get user profile page
// @route   GET /profile/:id
// @access  Public
const getProfilePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Assuming the user ID is provided as a route parameter
    const user = yield User_1.default.findById(id)
        .populate("favorites", "title imageUrl tags")
        .populate("userRatings.blockInfo", "title imageUrl")
        .populate("myBlocks", "title imageUrl tags")
        .exec();
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error("User not found");
    }
    // Get the three tags with the highest count
    const favoriteTags = user.showFavoriteTags
        ? user.favoriteTags
            .filter((tag) => tag.count > 0) // Filter tags with a count over 0
            .sort((a, b) => b.count - a.count) // Sort tags in descending order of count
            .slice(0, 2) // Take the top two tags
            .map((tag) => tag.tagName) // Extract the tag names
        : null;
    const userProfile = {
        personalInfo: {
            name: user.name,
            email: user.email,
            location: user.location,
            aboutMe: user.aboutMe,
            website: user.website,
            favoriteTags: favoriteTags,
            birthday: user.birthday,
            profilePic: user.profilePic,
        },
        favoriteBlocks: user.showFavorites ? user.favorites : null,
        ratedBlocks: user.userRatings.map((rating) => ({
            block: rating.blockInfo,
            rating: rating.rating,
        })),
        createdBlocks: user.myBlocks,
    };
    res.status(http_status_codes_1.StatusCodes.OK).json(userProfile);
});
// @desc    Get user's favorite blocks
// @route   GET /profile/favorite-blocks
// @access  Public
const getFavoriteBlocks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const user = yield User_1.default.findById(userId)
        .populate({
        path: "favorites",
        select: "title image tags",
        options: {
            skip: (page - 1) * limit,
            limit,
        },
    })
        .exec();
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error("User not found");
    }
    const favoriteBlocks = user.favorites;
    res.status(http_status_codes_1.StatusCodes.OK).json(favoriteBlocks);
});
// @desc    Get user's rated blocks
// @route   GET /profile/rated-blocks
// @access  Public
const getRatedBlocks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const user = yield User_1.default.findById(userId)
        .populate({
        path: "userRatings.block",
        select: "title image tags",
        options: {
            skip: (page - 1) * limit,
            limit,
        },
    })
        .exec();
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error("User not found");
    }
    const ratedBlocks = user.userRatings.map((rating) => ({
        block: rating.blockInfo,
        rating: rating.rating,
    }));
    res.status(http_status_codes_1.StatusCodes.OK).json(ratedBlocks);
});
// @desc    Get user's created blocks
// @route   GET /profile/created-blocks
// @access  Public
const getCreatedBlocks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const user = yield User_1.default.findById(userId)
        .populate({
        path: "myBlocks",
        select: "title image tags",
        options: {
            skip: (page - 1) * limit,
            limit,
        },
    })
        .exec();
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error("User not found");
    }
    const createdBlocks = user.myBlocks;
    res.status(http_status_codes_1.StatusCodes.OK).json(createdBlocks);
});
const getMoneyEarned = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield User_1.default.findById(req.user);
    if (!currentUser) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error("Not authorized");
    }
    res.json({ moneyEarnedInCents: currentUser.moneyEarnedInCents });
});
exports.default = {
    registerUser,
    verifyEmail,
    loginUser,
    showCurrentUser,
    logout,
    forgotPassword,
    resetPassword,
    editProfile,
    getMyProfilePageForEditing,
    getProfilePage,
    getFavoriteBlocks,
    getRatedBlocks,
    getCreatedBlocks,
    getMoneyEarned
};
