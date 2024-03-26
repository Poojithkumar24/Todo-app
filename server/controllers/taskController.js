const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//add a task
const addTask = async (req, res) => {
  
  try{
    const task = await prisma.task.create({
      data: req.body,
    });
  
    res.json({ message: "Task added", task });
  }catch(error){
    console.log(error,"cannot add task")
  }
};


// add multiple tasks
const bulkAddTasks = async (req, res) => {
  try{
    const tasks = await prisma.task.createMany({
      data: req.body,
    });
  
    res.json({ message: "Tasks added", tasks });
  }catch(error){
    console.log(error)
  }
};


//get all tasks

const getAllTasks = async (req, res) => {
  try{
    const tasks = await prisma.task.findMany();

    res.json(tasks);
  }catch(error){
    console.log(error,"cannot get all tasks")
  }
};


// get a particular task

const getTaskById = async (req, res) => {
  const { TASK_ID } = req.params;
  try{
    
    const task = await prisma.task.findUnique({
      where: { id: parseInt(TASK_ID) },
    });

    res.json(task);
  }catch(error){
    console.log(error,"cannot get task")
  }
};


// update a task

const updateTask = async (req, res) => {
  console.log("Update task function called"); // Debugging line
  const { TASK_ID } = req.params;
  const updatedData = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: {
        task_id: TASK_ID,
      },
      data: updatedData,
    });

    res.json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};



//delete a task

const deleteTask = async (req, res) => {
  console.log("Delete task function called"); // Debugging line
  const { TASK_ID } = req.params;
  
  try {
    await prisma.task.delete({
      where: {
        task_id: TASK_ID,
      },
    });

    res.json({ message: "Task removed" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};


module.exports = {
  addTask,
  bulkAddTasks,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
