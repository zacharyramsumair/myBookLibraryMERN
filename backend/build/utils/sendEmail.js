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
const mail_1 = __importDefault(require("@sendgrid/mail"));
// use Ethereal
// const sendEmail = async ({ to, subject, html }:IEmailVariables) => {
// 	const transporter = nodemailer.createTransport(nodemailerConfig);
// 	// send mail with defined transport object
// 	return transporter.sendMail({
// 		from: '"Zach 👻" <zach@book.com>', // sender address
// 		to,
// 		subject,
// 		html,
// 	});
// };
//use Sendgrid
const sendEmail = ({ to, subject, html }) => __awaiter(void 0, void 0, void 0, function* () {
    mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to,
        from: "clairbailyboooks@gmail.com",
        subject,
        html,
    };
    mail_1.default
        .send(msg)
        .then(() => {
        console.log("Email sent");
    })
        .catch((error) => {
        console.error(error);
    });
});
exports.default = sendEmail;
