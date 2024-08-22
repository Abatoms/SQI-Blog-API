const express = require("express");
const blogRoutes = require("./routes/blog");
const app = express();

app.use(express.json());

app.use("/blogs", blogRoutes);

module.exports = app;
