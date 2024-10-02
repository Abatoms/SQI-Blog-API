const Users = require("./../model/user");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/AppError");
const sendEmail = require("./../utils/email");
const createVerificationTokenAndSendEmail = require("./../utils/createVerificationTokenAndSendEmail");

const register = async (req, res, next) => {
  try {
    const { email, firstname, lastname, password } = req.body;

    if (!email || !firstname || !lastname || !password) {
      throw new AppError("Please fill in all required fields", 400);
    }

    // Check if user with the email exists
    const existingUser = await Users.findOne({ email: email });

    if (existingUser) {
      throw new AppError("User with the email address exists", 400);
    }

    // Hash the user password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(password, hashedPassword);

    const newUser = await Users.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
    });

    // Generate jwt token
    const jwtSecret = process.env.jwtSecret;
    jwtExpiresIn = process.env.jwtExpiresIn;
    const token = jwt.sign({ id: newUser._id }, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });
    // console.log(token);

    await sendEmail({
      email: email,
      subject: "Welcome to SQI Blogga",
      message:
        "Welcome to our very beautiful and informative blogging website. We are pleased tohave you, or not. ",
    });

    // Create a verification url and send to the user's email
    await createVerificationTokenAndSendEmail(req, newUser);

    // Send response
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        user: newUser,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // Get user credentials
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Please provide email and password", 400);
    }
    // Check if the user exists and the password is correct

    const user = await Users.findOne({ email: email }, "+password");
    console.log(user);

    let checkIfPasswordIscorrect = false;
    if (user) {
      checkIfPasswordIscorrect = await bcrypt.compare(password, user?.password);
    }
    console.log(checkIfPasswordIscorrect);

    if (!user || !checkIfPasswordIscorrect) {
      throw new AppError("Invalid email or password", 400);
    }

    // Generate jwt token
    const jwtSecret = process.env.jwtSecret;
    jwtExpiresIn = process.env.jwtExpiresIn;
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });
    console.log(token);

    // Send response
    res.status(201).json({
      status: "success",
      message: "Login Successfull",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Verify email address
const verifyEmailAddress = async (req, res, next) => {
  try {
    const { email, verificationToken } = req.params;
    if (!email || !verificationToken) {
      throw new AppError("Invalid verification link", 400);
    }

    // 1. Find the user with the email address
    const user = await Users.findOne({ email });

    if (!user) {
      throw new AppError("User with the email addres not found", 404);
    }

    // Check if the user email is already verified
    if (user.email_verified) {
      throw new AppError("User email has already been verified", 400);
    }
    // 2. Compare the verification token
    const isTokenValid = await bcrypt.compare(
      verificationToken,
      user.verification_token
    );

    if (!isTokenValid) {
      throw new AppError("Invalid verification token", 400);
    }

    // 3. Update the user email_verified field to true
    user.email_verified = true;
    user.verification_token = undefined;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Resend Email Verification url
const resendEmailVerificationUrl = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new AppError("Please provide email", 400);
    }

    // Find the user with the email address
    const user = await Users.findOne({ email });

    if (!user) {
      throw new AppError("User with the email address not found", 404);
    }

    // Check if the user email is already verified
    if (user.email_verified) {
      throw new AppError("User email has already been verified", 400);
    }

    await createVerificationTokenAndSendEmail(req, user);

    res.status(200).json({
      status: "success",
      message: "Verification url resent successfully",
    });
  } catch (error) {
    next(error);
  }
};
// forgot password

// Reset password
module.exports = {
  register,
  login,
  verifyEmailAddress,
  resendEmailVerificationUrl,
};
