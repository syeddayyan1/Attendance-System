const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, name, password) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Your Employee Account",
    text: `Hello ${name},

Your employee account has been created.

Email: ${to}
Password: ${password}

Please use these credentials to login.`,
  });
};

module.exports = sendEmail;