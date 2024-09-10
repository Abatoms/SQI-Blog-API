const Users = require("./../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;

    if (!email || !firstname || !lastname || !password) {
      throw new Error("Please fill in all required fields");
    }

    // Check if user with the email exists
    const existingUser = await Users.findOne({ email: email });

    if (existingUser) {
      throw new Error("User with the email address exists");
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
    console.log(token);

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
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    // Get user credentials
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
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
      throw new Error("Invalid email or password");
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
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Verify email adress

// forgot password

// Reset password
module.exports = { register, login };
