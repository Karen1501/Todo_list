const mongoose = require("mongoose");

const SubtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ["pendiente", "completada"],
    default: "pendiente",
  },
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
});

module.exports = mongoose.model("Subtask", SubtaskSchema);
