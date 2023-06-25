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
exports.xssOptions = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const path_1 = __importDefault(require("path"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const connect_1 = __importDefault(require("./db/connect"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const blockRoutes_1 = __importDefault(require("./routes/blockRoutes"));
const stripeRoutes_1 = __importDefault(require("./routes/stripeRoutes"));
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200,
}));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
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
exports.xssOptions = {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ["script"],
};
// app.use(notFoundMiddleware);
const port = process.env.PORT || 5000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)(process.env.MONGO_URI);
        // Use the authRouter for the '/api/v1/auth' route
        app.use("/api/v1/auth", authRoutes_1.default);
        // Use the blockRouter for the '/api/v1/blocks' route
        app.use("/api/v1/blocks", blockRoutes_1.default);
        app.use("/api/v1/stripe", stripeRoutes_1.default);
        if (process.env.NODE_ENV === "production") {
            app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend/dist")));
            app.get("*", (req, res) => res.sendFile(path_1.default.resolve(__dirname, "../", "frontend", "dist", "index.html")));
        }
        else {
            app.get("/", (req, res) => res.send("Please set to production"));
        }
        //route to get the CSRF token
        // app.get("/getCsrfToken", async (req: Request, res: Response) => {
        // 	res.json({csrfToken:req.csrfToken()})
        // })
        app.use(errorHandler_1.default);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
