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
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const http_status_codes_1 = require("http-status-codes");
const stripe_1 = require("../utils/stripe");
const body_parser_1 = __importDefault(require("body-parser"));
const authentication_1 = require("../middleware/authentication");
const date_fns_1 = require("date-fns");
const router = express_1.default.Router();
router.use(authentication_1.authenticateUser);
router.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield stripe_1.stripe.prices.list({
        apiKey: process.env.STRIPE_SECRET_KEY,
    });
    return res.json(products);
}));
router.post("/purchase", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield User_1.default.findById(req.user);
    if (!currentUser) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error("Not authorized");
    }
    const lineItemsMetadata = JSON.stringify([
        {
            priceId: req.body.priceId,
            productId: req.body.productId,
            // currentUser: req.user,
        },
    ]);
    if (req.body.mode == "payment") {
        const session = yield stripe_1.stripe.checkout.sessions.create({
            mode: req.body.mode,
            // mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: req.body.priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.EMAIL_ORIGIN}/`,
            cancel_url: `${process.env.EMAIL_ORIGIN}/store`,
            customer: currentUser.stripeCustomerId,
            // Add metadata to the payment intent
            payment_intent_data: {
                metadata: {
                    line_items: lineItemsMetadata,
                },
            },
        }, {
            apiKey: process.env.STRIPE_SECRET_KEY,
        });
        return res.json(session);
    }
    else {
        const subscription = yield stripe_1.stripe.subscriptions.list({
            customer: currentUser.stripeCustomerId,
        });
        if (subscription.data.length > 0) {
            res.status(http_status_codes_1.StatusCodes.CONFLICT);
            throw new Error("You already have a subscription, please cancel that to buy a new one");
        }
        const session = yield stripe_1.stripe.checkout.sessions.create({
            // mode: req.body.mode,
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: req.body.priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.EMAIL_ORIGIN}/`,
            cancel_url: `${process.env.EMAIL_ORIGIN}/store`,
            customer: currentUser.stripeCustomerId,
            metadata: {
                priceId: req.body.priceId,
                productId: req.body.productId,
                currentUser: req.user,
                // Add more key-value pairs as needed
            },
        }, {
            // expand: ["payment_intent"],
            apiKey: process.env.STRIPE_SECRET_KEY,
        });
        return res.json(session);
    }
}));
router.post("/webhook", body_parser_1.default.raw({ type: "application/json" }), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const event = request.body;
    if (event.type == "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const customerId = paymentIntent.customer;
        const currentUser = yield User_1.default.findOne({
            stripeCustomerId: customerId,
        });
        if (!currentUser) {
            response.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
            throw new Error("Not authorized");
        }
        let productId = "";
        if (paymentIntent.invoice) {
            const invoice = yield stripe_1.stripe.invoices.retrieve(paymentIntent.invoice);
            if (invoice) {
                productId = (_c = (_b = (_a = invoice === null || invoice === void 0 ? void 0 : invoice.lines) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.price) === null || _c === void 0 ? void 0 : _c.product;
            }
        }
        else {
            productId = JSON.parse(paymentIntent.metadata.line_items)[0]
                .productId;
        }
        const currentDate = new Date();
        const startOfCurrentIncrement = (0, date_fns_1.startOfDay)(currentDate);
        // console.log(productId);
        if (productId == "prod_O7Gtlj72uJ1sFC") {
            // Handfull of Gems
            currentUser.noOfGems += 5;
        }
        else if (productId == "prod_O7Gt2fvlamo4oq") {
            // Pouch of Gems
            currentUser.noOfGems += 20;
        }
        else if (productId == "prod_O7Gug1kUc5xkYV") {
            // Bucket of Gems
            currentUser.noOfGems += 50;
        }
        else if (productId == "prod_O7Gr7q0NmZpSzN") {
            // Standard Plan
            currentUser.tier = "standard";
            currentUser.noOfGems += 20;
            currentUser.lastGemIncrement = startOfCurrentIncrement;
            currentUser.nextGemIncrement = (0, date_fns_1.addDays)(startOfCurrentIncrement, 31);
        }
        else if (productId == "prod_O701d8QfGkpAAf") {
            // Premium Plan
            currentUser.tier = "premium";
            currentUser.noOfGems += 20;
            currentUser.lastGemIncrement = startOfCurrentIncrement;
            currentUser.nextGemIncrement = (0, date_fns_1.addDays)(startOfCurrentIncrement, 31);
        }
        yield currentUser.save();
    }
    // Return a 200 response to acknowledge receipt of the event
    response.json({ received: true });
}));
router.delete("/cancel-subscription", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield User_1.default.findById(req.user);
    if (!currentUser) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error("Not authorized");
    }
    // const subscription = await stripe.subscriptions.del(currentUser.stripeCustomerId)
    const subscription = yield stripe_1.stripe.subscriptions.list({
        customer: currentUser.stripeCustomerId,
    });
    if (subscription.data.length < 1) {
        res.status(http_status_codes_1.StatusCodes.EXPECTATION_FAILED);
        throw new Error("You do not own a subscription currently");
    }
    const cancelledSubscription = yield stripe_1.stripe.subscriptions.del(subscription.data[0].id);
    if (cancelledSubscription.status == "canceled") {
        currentUser.tier = "free";
        yield currentUser.save();
    }
    // subscription.data[0].items.data.price.product 
    // pre prod_O701d8QfGkpAAf
    // standard  prod_O7Gr7q0NmZpSzN
    // return res.json({ subscription });
    return res.json({ msg: "Subscription cancelled" });
}));
exports.default = router;
