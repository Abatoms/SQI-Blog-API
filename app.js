const express = require("express");
const morgan = require("morgan");
const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");
const app = express();

app.use(express.json());

app.use(morgan("dev"));

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

module.exports = app;
