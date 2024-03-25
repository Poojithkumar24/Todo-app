const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addTask = async (req, res) => {
  
  const task = await prisma.task.create({
    data: req.body,
  });

  res.json({ message: "Task added", task });
};

const bulkAddTasks = async (req, res) => {
  const tasks = await prisma.task.createMany({
    data: req.body,
  });

  res.json({ message: "Tasks added", tasks });
};

const getAllTasks = async (req, res) => {
  const tasks = await prisma.task.findMany();

  res.json(tasks);
};

const getTaskById = async (req, res) => {
  const { TASK_ID } = req.params;
  const task = await prisma.task.findUnique({
    where: { id: parseInt(TASK_ID) },
  });

  res.json(task);
};

const updateTask = async (req, res) => {
  const { TASK_ID } = req.params;
  const task = await prisma.task.update({
    where: { id: parseInt(TASK_ID) },
    data: req.body,
  });

  res.json({ message: "Task updated", task });
};

const deleteTask = async (req, res) => {
  const { TASK_ID } = req.params;
  await prisma.task.delete({
    where: { id: parseInt(TASK_ID) },
  });

  res.json({ message: "Task removed" });
};

module.exports = {
  addTask,
  bulkAddTasks,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
