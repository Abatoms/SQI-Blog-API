const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "User with the email exists"],
    trim: true,
  },

  firstname: {
    type: String,
    required: [true, "Please provide firstname"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Please provide lastname"],
    trim: true,
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [8, "Password be at least 8 characters"],
    select: false,
  },

  bio: {
    type: String,
  },

  phone_number: {
    type: String,
  },

  email_verified: {
    type: Boolean,
    default: false,
  },

  verification_token: {
    type: String,
  },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
