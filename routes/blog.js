const express = require("express");
const {
  getAllBlogs,
  getSingleBlog,
  createNewBlog,
  updateBlog,
  deleteBlog,
} = require("./../controllers/blog");
const blogAlat = require("./../middlewares/blogAlat");
const {
  protectRoute,
  checkIfEmailIsVerified,
} = require("./../middlewares/auth");
const { imageUpload } = require("./../utils/multer");
const router = express.Router();

// router.use(blogAlat);
// path /blogs/
router.get("/", getAllBlogs);

// path /blogs/:id
router.get("/:id", getSingleBlog);

// path /blogs, method post
router.post(
  "/",
  protectRoute,
  checkIfEmailIsVerified,
  imageUpload.single("image"),
  createNewBlog
);

// path /blogs/:id, method patch
router.patch("/:id", updateBlog);

// path /blogs/:id, method delete
router.delete("/:id", deleteBlog);

module.exports = router;
