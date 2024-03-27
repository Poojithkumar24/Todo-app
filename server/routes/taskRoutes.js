// Update your routes in taskRouter.js
const express = require("express");
const router = express.Router();
const {
  addTask,
  bulkAddTasks,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getUserTasks,
} = require("../controllers/taskController");

// Protected routes with token verification middleware
router.post("/", addTask);
router.post("/bulk_add",  bulkAddTasks);
router.get("/",  getAllTasks);
router.get("/user-tasks/:userId",  getUserTasks);  // Update this route
router.get("/:TASK_ID",  getTaskById);
router.put("/:TASK_ID",  updateTask);
router.delete("/:TASK_ID", deleteTask);

module.exports = router;
