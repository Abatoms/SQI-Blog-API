const Users = require("./../model/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      status: "success",
      message: "All users gotten successfully",
      result: users.length,
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const user = await Users.findById(id);

    if (!user) {
      throw new Error("user not found");
    }

    res.status(200).json({
      status: "success",
      message: "user gotten successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const createNewUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, firstname, lastname, password, bio, phone_number } =
      req.body;

    if (!email || !firstname || !lastname || !password) {
      throw new Error("Please fill in all required fields");
    }
    // Create a new User
    const newUser = await Users.create({
      email,
      firstname,
      lastname,
      password,
      bio,
      phone_number,
    });

    if (!newUser) {
      throw new Error("Failed to create a new User");
    }

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedUser = await Users.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await Users.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
};
