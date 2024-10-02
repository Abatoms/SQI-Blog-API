const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    // host: "",
    // port: "",
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // var transport = nodemailer.createTransport({
  //   host: "sandbox.smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "d7514c4e683759",
  //     pass: "2df2b3b52636f1",
  //   },
  // });

  const mailOptions = {
    from: "<bolarinwaahmed22@gmail.com> Bolarinwa Ahmed",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
