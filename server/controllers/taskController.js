const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();




// add a task
const addTask = async (req, res) => {
  const { task_name, description, priority, status, start_date, end_date, userId } = req.body;
  
  try {
    const task = await prisma.task.create({
      data: {
        task_name: task_name.trim(),
        description: description.trim(),
        priority: priority.trim(),
        status: status.trim(),
        start_date: new Date(start_date), 
        end_date: new Date(end_date),     
        userId: userId, 
      },
    });

    res.json({ message: "Task added", task });
  } catch (error) {
    console.log(error, "cannot add task");
    res.status(500).json({ message: "Failed to add task" });
  }
};


// update a task
const updateTask = async (req, res) => {
  const { TASK_ID } = req.params;
  const { start_date, end_date } = req.body; 
  const updatedData = {
    ...req.body,
        start_date: new Date(start_date), 
        end_date: new Date(end_date),
  };

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
  console.log('Received query parameters:', req.query);


  try {
    let tasks;
  
    tasks = await prisma.task.findMany();
  
    res.json(tasks);
  } catch (error) {
    console.log(error, "cannot get all tasks");
    res.status(500).json({ message: "Failed to get tasks" });
  }
};



// get a particular task

const getTaskById = async (req, res) => {
  const { TASK_ID } = req.params;
  try{
    
    const task = await prisma.task.findUnique({
      where: { task_id:TASK_ID },
    });

    res.json(task);
  }catch(error){
    console.log(error,"cannot get task")
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

// Inside taskController.js
const getUserTasks = async (req, res) => {
  const { userId } = req.params; // Retrieve userId from the request parameters
  
  try {
    const tasks = await prisma.task.findMany({
      where: { userId }, // Filter tasks by userId
    });

    res.json(tasks);
  } catch (error) {
    console.log(error, "cannot get tasks");
    res.status(500).json({ message: "Failed to get tasks" });
  }
};




module.exports = {
  addTask,
  bulkAddTasks,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getUserTasks
};
