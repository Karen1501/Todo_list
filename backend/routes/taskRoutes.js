const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/tasks", authMiddleware, taskController.createTask);
router.get("/tasks", authMiddleware, taskController.getTasks);
router.put("/tasks/:id", authMiddleware, taskController.updateTask);
router.delete("/tasks/:id", authMiddleware, taskController.deleteTask);
router.patch("/tasks/:id/status", authMiddleware, taskController.toggleStatus);

module.exports = router;
