const jwt = require("jsonwebtoken");
const Users = require("../model/user");
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

    console.log(token);
    // Check if token exists
    if (!token) {
      throw new Error("Ptlease login to access this roue");
    }

    // verify the token
    const jwtSecret = process.env.jwtSecret;
    const decoded = jwt.verify(token, jwtSecret);
    console.log(decoded);

    if (!decoded) {
      throw new Error("Invalid token supplied, please login again to continue");
    }

    // Check if the jwt has expired
    if (decoded.exp > Date.now()) {
      throw new Error("Token has expired, please login again to continue");
    }

    const userId = decoded.id;

    // Find user based on the id
    const user = await Users.findById(userId);

    if (!user) {
      throw new Error(
        "Invalid user for the token supplied, please login again to continue"
      );
    }

    // Save user to the req
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = protectRoute;
