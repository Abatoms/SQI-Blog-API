const AppError = require("../utils/AppError");

// const handleCastErrorDB = (err) => {
//   const key = Object.keys(err.keyValue)[0];
//   const value = Object.values(err.keyValue)[0];
//   const message = `${key} with value  "${value}" exists already`;
//   console.log(message);
//   return new AppError(message, 400);
// };

const sendDevError = (err, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("Error: ", err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

// Error handler function
const errorHandler = async (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendDevError(error, res);
  } else {
    sendProdError(err, res);
  }

  next();
};

module.exports = errorHandler;
