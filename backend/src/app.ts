import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import xss, { IFilterXSSOptions } from "xss";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import path from "path";
import errorHandler from "./middleware/errorHandler";
import connectDB from "./db/connect";
import authRouter from "./routes/authRoutes";
import blockRouter from "./routes/blockRoutes";
import stripeRouter from "./routes/stripeRoutes";

const app = express();

app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_SECRET));

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src * 'self' data: https:"
  );
  next();
});

export const xssOptions: IFilterXSSOptions = {
  whiteList: {},
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script"],
};

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);

    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/blocks", blockRouter);
    app.use("/api/v1/stripe", stripeRouter);

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../../frontend/dist")));

      app.get("*", (req, res) =>
        res.sendFile(
          path.resolve(__dirname, "../../", "frontend", "dist", "index.html")
        )
      );
    } else {
      app.get("/", (req, res) => res.send("Please set to production"));
    }

    app.use(errorHandler);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
