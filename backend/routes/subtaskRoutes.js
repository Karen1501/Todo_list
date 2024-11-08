const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const subtaskController = require("../controllers/subtaskController");

router.post(
  "/tasks/:tasksId/subtasks",
  authMiddleware,
  subtaskController.createSubtask
);
router.get(
  "/tasks/:tasksId/subtasks",
  authMiddleware,
  subtaskController.getSubtaskByTask
);
router.put(
  "tasks/:taskId/subtasks/:subtaskId",
  authMiddleware,
  subtaskController.updateSubtask
);
router.delete(
  "/tasks/:taskId/subtasks/:subtaskId",
  authMiddleware,
  subtaskController.deleteSubtask
);
router.patch(
  "/tasks/:taskId/subtasks/:subtaskId/status",
  authMiddleware,
  subtaskController.toggleSubtaskStatus
);

module.exports = router;
