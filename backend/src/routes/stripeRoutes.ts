import express from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { stripe } from "../utils/stripe";
import bodyParser from "body-parser";

import { authenticateUser } from "../middleware/authentication";
import { addDays, startOfDay, startOfMonth } from "date-fns";



const router = express.Router();
router.use(authenticateUser);

router.get("/products", async (req, res) => {
	const products = await stripe.prices.list({
		apiKey: process.env.STRIPE_SECRET_KEY,
	});

	return res.json(products);
});

router.post("/purchase", async (req, res) => {

	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
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

		return res.json(session);
	} else {
		const subscription = await stripe.subscriptions.list({
			customer: currentUser.stripeCustomerId,
		});

		if (subscription.data.length > 0) {
			res.status(StatusCodes.CONFLICT);
			throw new Error(
				"You already have a subscription, please cancel that to buy a new one"
			);
		}

		const session = await stripe.checkout.sessions.create(
			{
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
			},
			{
				// expand: ["payment_intent"],
				apiKey: process.env.STRIPE_SECRET_KEY,
			}
		);

		return res.json(session);
	}
});

router.post(
	"/webhook",
	bodyParser.raw({ type: "application/json" }),
	async (request, response) => {
		const event = request.body;

		if (event.type == "payment_intent.succeeded") {
			const paymentIntent = event.data.object;
			const customerId = paymentIntent.customer;
			const currentUser = await User.findOne({
				stripeCustomerId: customerId,
			});
			if (!currentUser) {
				response.status(StatusCodes.UNAUTHORIZED);
				throw new Error("Not authorized");
			}

			let productId: string | undefined = "";

			if (paymentIntent.invoice) {
				const invoice = await stripe.invoices.retrieve(
					paymentIntent.invoice
				);
				if (invoice) {
					productId = invoice?.lines?.data[0]?.price?.product as string;
				}
			} else {
				productId = JSON.parse(paymentIntent.metadata.line_items)[0]
					.productId;
			}

			const currentDate = new Date();
			const startOfCurrentIncrement = startOfDay(currentDate);
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
				currentUser.lastGemIncrement = startOfCurrentIncrement;
				currentUser.nextGemIncrement = addDays(startOfCurrentIncrement, 31);
			} else if (productId == "prod_O701d8QfGkpAAf") {
				// Premium Plan
				currentUser.tier = "premium";
				currentUser.noOfGems += 20;
				currentUser.lastGemIncrement = startOfCurrentIncrement;
				currentUser.nextGemIncrement = addDays(startOfCurrentIncrement, 31);
			}
			await currentUser.save();
		}

		// Return a 200 response to acknowledge receipt of the event
		response.json({ received: true });
	}
);

router.delete("/cancel-subscription", async (req, res) => {
	const currentUser = await User.findById(req.user);
	if (!currentUser) {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error("Not authorized");
	}

	// const subscription = await stripe.subscriptions.del(currentUser.stripeCustomerId)
	const subscription = await stripe.subscriptions.list({
		customer: currentUser.stripeCustomerId,
	});

	if (subscription.data.length < 1) {
		res.status(StatusCodes.EXPECTATION_FAILED);
		throw new Error("You do not own a subscription currently");
	}

	const cancelledSubscription = await stripe.subscriptions.del(
		subscription.data[0].id
	);
	if (cancelledSubscription.status == "canceled") {
		currentUser.tier = "free";
		await currentUser.save();
	}
	// subscription.data[0].items.data.price.product 
	// pre prod_O701d8QfGkpAAf
	// standard  prod_O7Gr7q0NmZpSzN

	// return res.json({ subscription });
	return res.json({ msg: "Subscription cancelled" });
});

export default router;
