import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
const app = express();
import cookieParser from "cookie-parser";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
// import xss from 'xss-clean'
import xss, { IFilterXSSOptions } from "xss";
import { filterXSS } from "xss";

import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import path from "path";
import errorHandler from "./middleware/errorHandler";

import connectDB from "./db/connect";
import authRouter from "./routes/authRoutes";
import blockRouter from "./routes/blockRoutes";
import csrf from "csurf";
import crypto from "crypto";

app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		max: 200,
	})
);
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_SECRET));

//prevent CSRF attacks
// turn back on when done pass csrf-token in headers : learnt from https://www.youtube.com/watch?v=VrFNbqSUVP0

// export const csrfProtection = csrf({ cookie: {
//     httpOnly: true,
//     sameSite: 'strict',
//     maxAge: 60 // token expires 60 seconds, so when making a request, first get the token pass it into headers and then make the post put delete request
//     // maxAge: 60 * 60 // token expires in 1 hour
//   },
//  });

// app.use(csrfProtection);

// app.use((req, res, next) => {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

//remember to uncomment the GET request /getCsrfToken at the bottom of this page

// Use express-sanitizer to sanitize user input
app.use((req, res, next) => {
	res.setHeader("Content-Security-Policy", "default-src 'self'");
	next();
});

// XSS Prevention Middleware
export const xssOptions: IFilterXSSOptions = {
	whiteList: {},
	stripIgnoreTag: true,
	stripIgnoreTagBody: ["script"],
};

// app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI as string);

		if (process.env.NODE_ENV === "production") {
			app.use(express.static(path.join(__dirname, "../frontend/build")));

			app.get("*", (req, res) =>
				res.sendFile(
					path.resolve(__dirname, "../", "frontend", "build", "index.html")
				)
			);
		} else {
			app.get("/", (req, res) => res.send("Please set to production"));
		}

		//route to get the CSRF token

		// app.get("/getCsrfToken", async (req: Request, res: Response) => {
		// 	res.json({csrfToken:req.csrfToken()})
		// })

		
		// Use the authRouter for the '/api/v1/auth' route
		app.use("/api/v1/auth", authRouter);
		// Use the blockRouter for the '/api/v1/blocks' route
		app.use("/api/v1/blocks", blockRouter);

		app.use(errorHandler);
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
