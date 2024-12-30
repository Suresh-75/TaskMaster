const mongoose = require("mongoose");
const validator = require("validator");
const Task = require("./Task");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user name is required"],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    validate: [validator.isEmail, "please enter a valid EmailID"],
  },
  password: {
    type: String,
    required: [true, "A passord is required"],
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
