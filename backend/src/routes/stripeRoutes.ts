import express from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
// import Article from "../models/article";
// import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../utils/stripe";
import bodyParser from "body-parser";

import { authenticateUser } from "../middleware/authentication";
import { startOfMonth } from "date-fns";

// const currentUser = await User.findById(req.user);
// 	if (!currentUser) {
// 		res.status(StatusCodes.UNAUTHORIZED);
// 		throw new Error("Not authorized");
// 	}

const router = express.Router();
router.use(authenticateUser);

router.get("/products", async (req, res) => {
	const products = await stripe.prices.list({
		apiKey: process.env.STRIPE_SECRET_KEY,
	});

	return res.json(products);
});

router.post("/purchase", async (req, res) => {
	// const user = await User.findOne({ email: req.user });

	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	const lineItemsMetadata = JSON.stringify([
		{
			priceId: req.body.priceId,
			productId: req.body.productId,
			currentUser: req.user,
		},
	]);

	const session = await stripe.checkout.sessions.create(
		{
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
		},
		{
			apiKey: process.env.STRIPE_SECRET_KEY,
		}
	);

	// Update user's tier to "premium" if the session was created successfully

	// if (session) {
	// 	currentUser.tier = "premium";
	// 	await currentUser.save();
	// }
	// console.log(session);
	return res.json(session);
	// response.send().end;
});

router.post(
	"/webhook",
	bodyParser.raw({ type: "application/json" }),
	async (request, response) => {
		const event = request.body;

		if (event.type == "payment_intent.succeeded") {
			const paymentIntent = event.data.object;

			// console.log(paymentIntent)
			// const lineItems = paymentIntent?.latest_charge?.data[0]?.billing_details?.line_items;
			// console.log("1", paymentIntent.metadata.line_items);
			// console.log("2", JSON.parse(paymentIntent.metadata.line_items)[0]);
			// console.log(
			// 	"3",
			// 	JSON.parse(paymentIntent.metadata.line_items)[0].priceId
			// );
			// console.log(
			// 	"4",
			// 	JSON.parse(paymentIntent.metadata.line_items)[0].productId
			// );
			// console.log(paymentIntent.metadata.line_items.parse()[0])

			let productId = JSON.parse(paymentIntent.metadata.line_items)[0]
				.productId;

			let currentUserId = JSON.parse(paymentIntent.metadata.line_items)[0]
				.currentUser;

			const currentUser = await User.findById(currentUserId);
			console.log(currentUserId)
			console.log(JSON.parse(paymentIntent.metadata.line_items))
			if (!currentUser) {
				response.status(StatusCodes.UNAUTHORIZED);
				throw new Error("Not authorized");
			}

			const currentDate = new Date();
			const startOfCurrentMonth = startOfMonth(currentDate);
			console.log(productId);

			if (productId == "prod_O7Gtlj72uJ1sFC") {
				// Handfull of Gems
				currentUser.noOfGems += 5;
			} else if (productId == "prod_O7Gt2fvlamo4oq") {
				// Pouch of Gems
				currentUser.noOfGems += 20;
			} else if (productId == "prod_O7Gug1kUc5xkYV") {
				// Bucket of Gems
				currentUser.noOfGems += 50;
			} else if (productId == "prod_O7Gr7q0NmZpSzN") {
				// Standard Plan
				currentUser.tier = "standard";
				currentUser.noOfGems += 20;
				currentUser.lastGemIncrement = startOfCurrentMonth;
			} else if (productId == "prod_O701d8QfGkpAAf") {
				// Premium Plan
				currentUser.tier = "premium";
				currentUser.noOfGems += 20;
				currentUser.lastGemIncrement = startOfCurrentMonth;
			}
			await currentUser.save();
		}

		// Return a 200 response to acknowledge receipt of the event
		response.json({ received: true });
	}
);

router.post("/cancel-subscription", async (req, res) => {
	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	// if (!currentUser.stripeSubscriptionId) {
	//   return res.status(400).json({ message: "No active subscription found." });
	// }

	// const stripeResponse = await stripe.subscriptions.del(currentUser.stripeSubscriptionId);

	// Handle any necessary logic after canceling the subscription
	// For example, updating the currentUser's subscription status in the database

	return res.json({ message: "Subscription canceled successfully." });
});

export default router;
