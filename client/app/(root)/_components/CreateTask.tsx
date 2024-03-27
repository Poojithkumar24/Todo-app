'use client'


import { useState,useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

type Task = {
  task_name: string;
  description: string;
  priority: string;
  status: string;
  start_date: string;
  end_date: string;
  userId: string;
};

const CreateTask = () => {
  const [taskData, setTaskData] = useState<Task>({
    task_name: '',
    description: '',
    priority: '',
    status: '',
    start_date: '',
    end_date: '',
    userId: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addTask = async () => {
    

    const newTaskData: Task = {
      ...taskData,
    };

    try {
      await axios.post('http://localhost:4000/api/task', newTaskData);
      toast.success('Task added successfully!');
      
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask();
  };

  

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-2xl mb-8 text-center font-bold text-blue-600">Add New Task</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-600 font-bold">Task Name:</label>
          <input
            type="text"
            name="task_name"
            value={taskData.task_name}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-bold">Description:</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-bold">Priority:</label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
          >
            <option value="HIGHEST">HIGHEST</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-bold">Status:</label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
          >
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-bold">Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={taskData.start_date}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-bold">End Date:</label>
          <input
            type="date"
            name="end_date"
            value={taskData.end_date}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
