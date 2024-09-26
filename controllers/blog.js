const AppError = require("../utils/AppError");
const Blogs = require("./../model/blog");
const { dataUri } = require("./../utils/multer");
const { uploader } = require("./../config/cloudinary");

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blogs.find().populate("user");
    res.status(200).json({
      status: "success",
      message: "All blogs gotten successfully",
      result: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);

    const blog = await Blogs.findById(id).populate("user");

    if (!blog) {
      throw new AppError("Blog not found", 404);
    }

    res.status(200).json({
      status: "success",
      message: "Blog gotten successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

const createNewBlog = async (req, res, next) => {
  try {
    // console.log(req.body);
    // Get title and content from the request body
    const { title, content, description } = req.body;
    const userId = req.user.id;

    if (!req.file) {
      throw new AppError("Please upload an image for the blog", 400);
    }
    console.log(req.file);
    const imageData = dataUri(req).content;
    console.log(imageData);

    const result = await uploader.upload(imageData, {
      folder: "SQIBlogga/BlogImages",
      secure: true,
      use_filename: true,
    });

    console.log(result);

    // // Check if title and content are provided
    // if (!title || !content || !description) {
    //   throw new AppError("Title, content, and description, are required", 400);
    // }
    // Create a new Blog
    const newBlog = await Blogs.create({
      title,
      content,
      description,
      user: userId,
      image: result.secure_url,
    });

    if (!newBlog) {
      throw new AppError("Failed to create a new blog", 404);
    }

    res.status(201).json({
      status: "success",
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const id = req.params.id;

    const updatedBlog = await Blogs.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      status: "success",
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;

    await Blogs.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBlogs,
  getSingleBlog,
  createNewBlog,
  updateBlog,
  deleteBlog,
};
