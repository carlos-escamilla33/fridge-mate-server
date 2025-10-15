const nodemailer = require("nodemailer");
require("dotenv").config();
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_HOST = process.env.EMAIL_HOST;

const sendEmail = async (email, resetToken) => {
  try {
    const transporter = nodemailer.createTransport({
      host: `${EMAIL_HOST}`,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: `${EMAIL_USER}`,
        pass: `${EMAIL_PASS}`,
      },
    });

    const info = await transporter.sendMail({
        from: `${EMAIL_HOST}`,
        to: `${email}`,
        subject: `reset your password here: http://localhost:3000/api/auth/change-password?token=${resetToken}`,
        text: "Hello world?",
    });

    console.log("Message sent:", info.messageId);

  } catch (err) {
    throw err;
  }
};

module.exports = {
  sendEmail,
};
