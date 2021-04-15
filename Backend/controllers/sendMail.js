require("dotenv").config;
const nodemailer = require("nodemailer");

exports.sendMail = async (to, password) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL, // TODO: your gmail account
      pass: process.env.ADMIN_PASSWORD, // TODO: your gmail password
    },
  });

  let mailOptions = {
    from: process.env.ADMIN_EMAIL, // TODO: email sender
    to: to, // TODO: email receiver
    subject: "Account Created",
    html: `<h1>Use This password to Sign In : ${password} </h1>`,
  };

  let info = await transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log("Error occurs");
    }
  });
};
