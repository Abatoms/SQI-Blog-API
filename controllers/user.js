const Users = require("./../model/user");
const AppError = require("./../utils/AppError");
const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      status: "success",
      message: "All users gotten successfully",
      result: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);

    const user = await Users.findById(id);

    if (!user) {
      throw new AppError("user not found", 404);
    }

    res.status(200).json({
      status: "success",
      message: "user gotten successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const createNewUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, firstname, lastname, password, bio, phone_number } =
      req.body;

    if (!email || !firstname || !lastname || !password) {
      throw new AppError("Please fill in all required fields", 400);
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
      throw new AppError("Failed to create a new User", 404);
    }

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
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
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Users.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
};
