const mongoose = require("mongoose");

// Esquema de la tarea
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pendiente", "completada"],
    default: "pendiente",
  },
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subtask" }],
});

module.exports = mongoose.model("Task", taskSchema);
