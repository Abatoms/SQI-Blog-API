const express = require("express");
const {
  getAllBlogs,
  getSingleBlog,
  createNewBlog,
  updateBlog,
  deleteBlog,
} = require("./../controllers/blog");
const blogAlat = require("./../middlewares/blogAlat");
const protectRoute = require("./../middlewares/auth");
const router = express.Router();

// router.use(blogAlat);
// path /blogs/
router.get("/", getAllBlogs);

// path /blogs/:id
router.get("/:id", getSingleBlog);

// path /blogs, method post
router.post("/", protectRoute, createNewBlog);

// path /blogs/:id, method patch
router.patch("/:id", updateBlog);

// path /blogs/:id, method delete
router.delete("/:id", deleteBlog);

module.exports = router;
