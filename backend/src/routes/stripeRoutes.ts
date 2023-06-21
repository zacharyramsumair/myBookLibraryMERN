import express from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
// import Article from "../models/article";
// import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../utils/stripe";

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

	return res.json(session);
});

//   router.post("/purchase", async (req, res) => {
//     const user = await User.findOne({ email: req.user });

//     const session = await stripe.checkout.sessions.create(
//       {
//         mode: "payment",
//         payment_method_types: ["card"],
//         line_items: [
//           {
//             price: req.body.priceId,
//             quantity: 1,
//           },
//         ],
//         success_url: "http://localhost:3000/success",
//         cancel_url: "http://localhost:3000/cancel",
//         customer: user.stripeCustomerId,
//       },
//       {
//         apiKey: process.env.STRIPE_SECRET_KEY,
//       }
//     );

//     return res.json(session);
//   });

// router.post("/session", async (req, res) => {
//   const user = await User.findOne({ email: req.user });

//   const session = await stripe.checkout.sessions.create(
//     {
//       mode: "subscription",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: req.body.priceId,
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.EMAIL_ORIGIN}/`,
//      cancel_url: `${process.env.EMAIL_ORIGIN}/store`,
//       customer: user.stripeCustomerId,
//     },
//     {
//       apiKey: process.env.STRIPE_SECRET_KEY,
//     }
//   );

//   return res.json(session);
// });

export default router;
