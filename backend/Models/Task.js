const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A title is required"],
  },
  priority: {
    type: String,
    required: [true, "A priority is required"],
  },
  startTime: {
    type: String,
    required: [true, "A start time is required"],
  },
  endTime: {
    type: String,
    required: [true, "A end time is required"],
  },
  status: {
    type: Boolean,
    required: [true, "A status is required"],
  },
});

const Task = new mongoose.model("Task", taskSchema);
module.exports = Task;
