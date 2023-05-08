import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
const app = express();
import cookieParser from "cookie-parser";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
// import xss from 'xss-clean'
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import path from "path";
import errorHandler from "./middleware/errorHandler";

import connectDB from "./db/connect";
import authRouter from "./routes/authRoutes"
import csrf from 'csurf';


app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		max: 60,
	})
);
app.use(helmet());
app.use(cors());
// app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
// const csrfProtection = csrf({ cookie: true });
// app.use(csrfProtection);



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

		app.post("/post",(req, res) =>{
			let {email, password} =req.body
			if(!email ||!password){
				res.status(400)
				throw new Error("please provide both email and password")
			}

			res.send("something posted")
		})


		app.use('/api/v1/auth', authRouter);


		app.use(errorHandler);	
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
