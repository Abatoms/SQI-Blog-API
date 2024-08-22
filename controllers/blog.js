const blogs = require("./../model/blog");

const getAllBlogs = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "All blogs gotten successfully",
    result: blogs.length,
    data: blogs,
  });
};

const getSingleBlog = (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const blog = blogs.find((blog) => blog.id === Number(id));

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

const createNewBlog = (req, res) => {
  try {
    console.log(req.body);
    // Get title and content from the request body
    const { title, content } = req.body;

    // Check if title and content are provided
    if (!title || !content) {
      throw new Error("Title and content are required");
    }

    // Get the last blog in the blogs array
    const lastBlog = blogs[blogs.length - 1];
    // Create a new blog object
    const newBlog = {
      id: lastBlog.id + 1,
      title,
      content,
    };
    // Add the new blog to the blogs array
    blogs.push(newBlog);
    res.status(200).json({
      status: "success",
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateBlog = (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;

    if (!title && !content) {
      throw new Error("Title or content is required");
    }

    const blog = blogs.find((blog) => blog.id === Number(id));

    if (!blog) {
      throw new Error(`Blog with id ${id} not found`);
    }

    blogs[blog.id - 1] = {
      ...blog,
      title: title || blog.title,
      content: content || blog.content,
    };

    res.status(200).json({
      status: "success",
      message: "Blog updated successfully",
      data: blogs[blog.id - 1],
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteBlog = (req, res) => {
  try {
    const id = req.params.id;

    const blog = blogs.find((blog) => blog.id === Number(id));

    if (!blog) {
      throw new Error(`Blog with id ${id} not found`);
    }

    const index = blogs.indexOf(blog);
    blogs.splice(index, 1);

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
