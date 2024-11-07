const Task = require("../models/Task");
const Subtask = require("../models/Subtask");

//crear tarea
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// obtener todas las tareas
exports.getTasks = async (req, res) => {
  try {
    const status = req.query.status;
    const tasks = status
      ? await Task.find({ status }).populate("subtasks")
      : await Task.find().populate("subtasks");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//actualizar tarea
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//eliminar tare y sus subtareas
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    await Subtask.deleteMany({ task: task._id });
    await task.remove();
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//cambiar estado de la tarea
exports.toggleStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("subtasks");
    if (task.subtasks.some((subtask) => subtask.status === "pendiente")) {
      return res
        .status(400)
        .json({ message: "Todas las subtareas deben estar completadas" });
    }
    task.status = task.status === "pendiente" ? "completada" : "pendiente";
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
