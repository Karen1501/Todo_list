const Task = require("../models/Task");
const Subtask = require("../models/Subtask");

//crear una subtarea

exports.createSubtask = async (req, res) => {
  try {
    const { title, taskId, status } = req.body;

    // Verifica que `taskId` esté presente
    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    const newSubtask = new Subtask({
      title,
      task: taskId,
      status,
    });

    const savedSubtask = await newSubtask.save();
    res.status(201).json(savedSubtask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Obtener subtareas de una tarea
exports.getSubtaskByTask = async (req, res) => {
  try {
    const subtasks = await Subtask.find({ task: req.params.taskId });
    res.status(200).json(subtasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//actualizar una tarea
exports.updateSubtask = async (req, res) => {
  try {
    const subtask = await Subtask.findByIdAndUpdate(req.params.subtaskId, {
      new: true,
    });
    res.json(subtask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//eliminar una subtarea
exports.deleteSubtask = async (req, res) => {
  try {
    const subtask = await Subtask.findById(req.params.subtaskId);
    await subtask.remove();
    await Task.findByIdAndUpdate(subtask.task, {
      $pull: { subtasks: subtask._id },
    });
    res.json({ message: "Subtarea eliminada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//cambiar esatus de una subtarea
exports.toggleSubtaskStatus = async (req, res) => {
  try {
    const subtask = await Subtask.findById(req.params.subtaskId);
    subtask.status =
      subtask.status === "pendiente" ? "completada" : "pendiente";
    await subtask.save();

    const parentTask = await Task.findById(subtask.task).populate("subtasks");
    if (
      parentTask.subtask.every((subtask) => subtask.status === "completada")
    ) {
      parentTask.status = "completada";
    } else {
      parentTask.status = "pendiente";
    }
    await parentTask.save();
    res.json(subtask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
