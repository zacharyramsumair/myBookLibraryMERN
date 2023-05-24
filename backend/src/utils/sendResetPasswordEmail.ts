import sendEmail from "./sendEmail";

interface IVerificationEmailVariables{
    name:string;
    email:string;
    token:string;
    origin:string;
    
}

const sendVerificationEmail = async ({
    name,
    email,
    token,
    origin,
  }:IVerificationEmailVariables) => {
    const resetURL = `${origin}/resetPassword?token=${token}&email=${email}`;
  const message = `<p>Please click the following link to reset password : 
  <a href="${resetURL}">Reset Password</a></p>`;

  return sendEmail({
    to: email,
    subject: 'Reset Password',
    html: `<h4>Hello, ${name}</h4>
   ${message}
   `,
  });
  };
  
  export default sendVerificationEmail;