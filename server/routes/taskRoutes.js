const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  addTask,
  bulkAddTasks,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Protected routes with token verification middleware
router.post("/", addTask);
router.post("/bulk_add",  bulkAddTasks);
router.get("/",  getAllTasks);
router.get("/:TASK_ID",  getTaskById);
router.put("/:TASK_ID",  updateTask);
router.delete("/:TASK_ID", deleteTask);


module.exports = router;
