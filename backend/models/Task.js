const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtasks: [subtaskSchema], // Array para subtareas
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
