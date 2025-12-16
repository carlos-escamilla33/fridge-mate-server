const nodemailer = require("nodemailer");
require("dotenv").config();
const EMAIL = process.env.EMAIL;
const PASS = process.env.EMAIL_PASSWORD;
const USER = process.env.EMAIL_USER;

// const sendResetEmail = async (email, resetToken) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: `${EMAIL}`,
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: `${USER}`,
//         pass: `${PASS}`,
//       },
//     });

//     const info = await transporter.sendMail({
//         from: `${EMAIL}`,
//         to: `${email}`,
//         subject: "no-reply-fridge-mate",
//         text: `reset your password here: http://localhost:3000/api/auth/reset-password?token=${resetToken}`,
//     });

//     console.log("Message sent:", info.messageId);

//   } catch (err) {
//     throw err;
//   }
// };

const sendResetEmail = async (email, resetToken) => {
  try {
    // Create transporter based on environment
    const transporter = process.env.NODE_ENV === 'production'
      ? nodemailer.createTransport({
          host: "smtp.sendgrid.net",
          port: 587,
          secure: false,
          auth: {
            user: "apikey",
            pass: process.env.SENDGRID_API_KEY,
          },
        })
      : nodemailer.createTransport({
          host: process.env.EMAIL,
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

    // Create reset link based on environment
    const resetLink = process.env.NODE_ENV === 'production'
      ? `https://your-frontend-url.com/reset-password?token=${resetToken}`
      : `http://localhost:3000/api/auth/reset-password?token=${resetToken}`;

    const info = await transporter.sendMail({
      from: '"Fridge Mate" <carlosaescamilla3@gmail.com>', // Your verified SendGrid sender
      to: email,
      subject: "Password Reset Request - Fridge Mate",
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password for Fridge Mate.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>Or copy and paste this link into your browser:</p>
        <p>${resetLink}</p>
        <p><strong>This link will expire in 1 hour.</strong></p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <br>
        <p>Best regards,<br>Fridge Mate Team</p>
      `,
      text: `You requested to reset your password. Click this link: ${resetLink}. This link will expire in 1 hour.` // Plain text fallback
    });

    console.log("Password reset email sent:", info.messageId);

  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

module.exports = {
  sendResetEmail,
};


module.exports = {
  sendResetEmail,
};
