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
const sendEmail_1 = __importDefault(require("./sendEmail"));
const sendVerificationEmail = ({ name, email, verificationToken, origin, }) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyEmail = `${origin}/verifyEmail?token=${verificationToken}&email=${email}`;
    const message = `<p>Please confirm your email by clicking on the following link : 
    <a href="${verifyEmail}">Verify Email</a> </p>`;
    return (0, sendEmail_1.default)({
        to: email,
        subject: 'Email Confirmation',
        html: `<h4> Hello, ${name}</h4>
      ${message}
      `,
    });
});
exports.default = sendVerificationEmail;
