const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { cloudinaryConfig } = require("./config/cloudinary");
const errorHandler = require("./middlewares/error");
const AppError = require("./utils/AppError");
const blogRoutes = require("./routes/blog");
const logSomethingToTheConsole = require("./middlewares/logger");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const app = express();

app.use(express.json());
// allows you to send form data in express
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(cors("*"));
app.use("*", cloudinaryConfig);

// Custom middleware
// app.use(logSomethingToTheConsole);
const appName = process.env.APP_NAME;
console.log(appName);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: `Welcome to ${appName}`,
  });
});

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    status: "success",
    message: `Welcome to the  ${appName} API v1`,
  });
});

app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.all("*", (req, res) => {
  const message = new AppError(
    `Can't find ${req.originalUrl} with method ${req.method} on this server`
  );
  res.status(404).json({
    status: "error",
    message: message,
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
