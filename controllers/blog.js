
const Blogs = require("./../model/blog");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find().populate("user");
    res.status(200).json({
      status: "success",
      message: "All blogs gotten successfully",
      result: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const blog = await Blogs.findById(id).populate("user");

    if (!blog) {
      throw new Error("Blog not found");
    }

    res.status(200).json({
      status: "success",
      message: "Blog gotten successfully",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const createNewBlog = async (req, res) => {
  try {
    console.log(req.body);
    // Get title and content from the request body
    const { title, content, description, user } = req.body;

    // Check if title and content are provided
    if (!title || !content || !description || !user) {
      throw new Error("Title, content, and description, and user are required");
    }
    // Create a new Blog
    const newBlog = await Blogs.create({
      title,
      content,
      description,
      user,
    });

    if (!newBlog) {
      throw new Error("Failed to create a new blog");
    }

    res.status(201).json({
      status: "success",
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
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
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
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
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  getAllBlogs,
  getSingleBlog,
  createNewBlog,
  updateBlog,
  deleteBlog,
};
