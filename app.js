const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const blogRoutes = require("./routes/blog");
const logSomethingToTheConsole = require("./middlewares/logger");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const app = express();

app.use(express.json());

app.use(morgan("dev"));
app.use(cors("*"));

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
  res.status(404).json({
    status: "error",
    message: `Can't find ${req.originalUrl} with method ${req.method} on this server`,
  });
});
module.exports = app;
