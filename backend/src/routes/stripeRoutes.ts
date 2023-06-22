import express from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
// import Article from "../models/article";
// import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../utils/stripe";
import bodyParser from "body-parser";

import { authenticateUser } from "../middleware/authentication";

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

function handlePaymentIntentSucceeded(paymentIntent: any) {
	console.log("df", paymentIntent);
}

// router.post(
// 	"/webhook",
// 	express.raw({ type: "application/json" }),
// 	(request: any, response: any) => {
// 		const sig: any = request.headers["stripe-signature"];
// 		const endpointSecret =
// 			"whsec_ced679d488c6fbfe79af55d1b1de1e0d51e35becb3f0d5f8a16be43dfdb42242";

// 		console.log(endpointSecret);

// 		let body = "";
// 		let event: any = {
// 			data: { object: "" },
// 			type: "twinke",
// 		};

// 		request.on("data", (chunk: any) => {
// 			body += chunk;
// 		});

// 		request.on("end", () => {
// 			console.log("df",body);
// 			try {
// 				console.log(body);
// 				event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
// 				console.log("a",event);
// 				console.log("v",event.type);
// 				console.log("g",event?.data?.object);

// 				// Handle the event
// 				switch (event.type) {
// 					case "payment_intent.succeeded":
// 						const paymentIntentSucceeded = event.data.object;
// 						console.log("payment", paymentIntentSucceeded);
// 						handlePaymentIntentSucceeded(paymentIntentSucceeded);
// 						// Handle payment_intent.succeeded event
// 						break;
// 					// Handle other event types
// 					default:
// 						console.log(`Unhandled event type ${event.type}`);
// 				}
// 			} catch (err:any) {
// 				console.log(err.message);
// 				return response.status(400).send(`Webhook Error: ${err.message}`);
// 			}
// 		});

// 		console.log("z",request.data.object.id);
// 		console.log("ze",request);

// 		response.send().end();
// 	}
// );


async function getProduct(paymentIntent:any){
	const paymentIntentInfo = await stripe.paymentIntents.retrieve(paymentIntent.id);

	// Access the product ID from the payment intent's metadata
	const productId = paymentIntentInfo.metadata.productId;
	
	// Retrieve the product from your database or Stripe API
	const product = await stripe.products.retrieve(productId);
	
	console.log("Purchased Product:", product);
}

router.post(
	"/webhook",
	bodyParser.raw({ type: "application/json" }),
	(request, response) => {
		const event = request.body;

		// Handle the event
		switch (event.type) {
			case "payment_intent.succeeded":
				const paymentIntent = event.data.object;
				console.log("PaymentIntent was successful!");
				// console.log(paymentIntent);
				// getProduct(paymentIntent)
				// return
				break;
			case "payment_method.attached":
				const paymentMethod = event.data.object;
				console.log("PaymentMethod was attached to a Customer!");
				// return
				break;
			// ... handle other event types
			default:
				console.log(`Unhandled event type ${event.type}`);
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
