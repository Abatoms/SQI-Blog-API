const express = require("express");
const {
  getAllBlogs,
  getSingleBlog,
  createNewBlog,
  updateBlog,
  deleteBlog,
} = require("./../controllers/blog");
const router = express.Router();

// path /blogs/
router.get("/", getAllBlogs);

// path /blogs/:id
router.get("/:id", getSingleBlog);

// path /blogs, method post
router.post("/", createNewBlog);

// path /blogs/:id, method patch
router.patch("/:id", updateBlog);

// path /blogs/:id, method delete
router.delete("/:id", deleteBlog);

module.exports = router;
