const nodemailer = require("nodemailer");
require("dotenv").config();
const EMAIL = process.env.EMAIL;
const PASS = process.env.EMAIL_PASSWORD;
const USER = process.env.EMAIL_USER;

const sendResetEmail = async (email, resetToken) => {
  try {
    const transporter = nodemailer.createTransport({
      host: `${EMAIL}`,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: `${USER}`,
        pass: `${PASS}`,
      },
    });

    const info = await transporter.sendMail({
        from: `${EMAIL}`,
        to: `${email}`,
        subject: "no-reply-fridge-mate",
        text: `reset your password here: http://localhost:3000/api/auth/reset-password?token=${resetToken}`,
    });

    console.log("Message sent:", info.messageId);

  } catch (err) {
    throw err;
  }
};

module.exports = {
  sendResetEmail,
};
