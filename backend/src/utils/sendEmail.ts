import nodemailer from "nodemailer";
import nodemailerConfig from "./nodemailerConfig";
import sgMail from "@sendgrid/mail";

interface IEmailVariables {
	to: string;
	subject: string;
	html: string;
}
// use Ethereal

const sendEmail = async ({ to, subject, html }:IEmailVariables) => {

	const transporter = nodemailer.createTransport(nodemailerConfig);

	// send mail with defined transport object
	return transporter.sendMail({
		from: '"Zach 👻" <zach@book.com>', // sender address
		to,
		subject,
		html,
	});

};


//use Sendgrid

// const sendEmail = async ({ to, subject, html }: IEmailVariables) => {
// 	sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
// 	const msg = {
// 		to,
// 		from: "clairbailyboooks@gmail.com", // Change to your verified sender
// 		subject,
// 		html,
// 	};

// 	sgMail
// 		.send(msg)
// 		.then(() => {
// 			console.log("Email sent");
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});
// };

export default sendEmail;
