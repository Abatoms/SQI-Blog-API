const mongoose = require("mongoose");

// Define the schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: [true, "A blog with this title already exists"],
    minLength: 5,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true],
  },
  image: {
    type: String,
  },
});

// Creating a model
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
