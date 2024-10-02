const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendEmail = require("./email");
const createVerificationTokenAndSendEmail = async (req, user) => {
  // 1. Generate a verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  console.log(verificationToken);
  // 2. Generated an hashed version of the token and save to the user document
  const hashedVerificationToken = bcrypt.hashSync(verificationToken, 12);
  console.log(hashedVerificationToken);
  // 3. Generate a verification url
  console.log(req.protocol);
  console.log(req.get("host"));
  const verification_url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/verify-email/${user.email}/${verificationToken}`;
  user.verification_token = hashedVerificationToken;
  await user.save();
  // 4. Send the verification url to the user's email
  await sendEmail({
    email: user.email,
    subject: "Verify Your Email Address",
    message: `Please click on the link below to verify your email address. \n\n ${verification_url}`,
  });
};

module.exports = createVerificationTokenAndSendEmail;
