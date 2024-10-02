const jwt = require("jsonwebtoken");
const Users = require("../model/user");
const AppError = require("./../utils/AppError");
const protectRoute = async (req, res, next) => {
  try {
    let token = "";
    // Get the token from authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // console.log(token);
    // Check if token exists
    if (!token) {
      throw new AppError("Ptlease login to access this route", 401);
    }

    // verify the token
    const jwtSecret = process.env.jwtSecret;
    const decoded = jwt.verify(token, jwtSecret);
    // console.log(decoded);

    if (!decoded) {
      throw new AppError(
        "Invalid token supplied, please login again to continue",
        401
      );
    }

    // Check if the jwt has expired
    if (decoded.exp > Date.now()) {
      throw new AppError(
        "Token has expired, please login again to continue",
        401
      );
    }

    const userId = decoded.id;

    // Find user based on the id
    const user = await Users.findById(userId);

    if (!user) {
      throw new AppError(
        "Invalid user for the token supplied, please login again to continue",
        404
      );
    }

    // Save user to the req
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const checkIfEmailIsVerified = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.email_verified) {
      throw new AppError(
        "Please verify your email address to access this route",
        401
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { protectRoute, checkIfEmailIsVerified };
