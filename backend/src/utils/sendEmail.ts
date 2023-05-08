import nodemailer from "nodemailer";
import nodemailerConfig from "./nodemailerConfig";

interface IEmailVariables{
    to:string;
    subject:string;
    html:string;
}

const sendEmail = async ({ to, subject, html }:IEmailVariables) => {
	let testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport(nodemailerConfig);

	// send mail with defined transport object
	return transporter.sendMail({
		from: '"Zach 👻" <zach@book.com>', // sender address
		to,
		subject,
		html,
	});

	//   const transporter = nodemailer.createTransport(nodemailerConfig);

	//   return transporter.sendMail({
	//     from: '"Coding Addict" <codingaddict@gmail.com>', // sender address
	//     to,
	//     subject,
	//     html,
	//   });
};

export default sendEmail;
