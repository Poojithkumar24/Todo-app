'use client'


import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { isLogin } from '@/utils/auth';

type Task = {
  task_name: string;
  description: string;
  priority: string;
  status: string;
  start_date: string;
  end_date: string;
};

const EditTaskPage = () => {
  const taskId = useParams().taskId;
  const [task, setTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<Task | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const router = useRouter();
  

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (!loggedIn.auth) {
        router.push("/login");
      }
    };

    authenticate();
  }, []);

  useEffect(() => {
    if (taskId) {
      fetchTaskById(taskId);
    }
  }, [taskId]);
  

  const fetchTaskById = async (taskId:any) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/task/${taskId}`);
      if (response.data) {
        setTask(response.data);
        setFormData(response.data);
      }
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (task) {
      const { name, value } = event.target;
      setFormData({ ...formData!, [name]: value });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData && taskId) {
      try {
        const response = await axios.put(`http://localhost:4000/api/task/${taskId}`, formData);
        if (response.status === 200) {
          
          
          toast.success('task updated sucessfully!')
          router.push('/tasks')
          
        }
      } catch (error) {
        toast.error('cant update task!');
      }
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  const handleDeleteTask = async () => {
    if (taskId) {
      try {
       
        await axios.delete(`http://localhost:4000/api/task/${taskId}`);
  
        
        const updatedTasksResponse = await axios.get('http://localhost:4000/api/task/');
        const updatedTasks = updatedTasksResponse.data;
  
        setFilteredTasks(updatedTasks);
        setTask(null); 
  
        
        router.push('/tasks');
        toast.success('Task deleted successfully!'); 
      } catch (error) {
        console.error('Error deleting task:', error);
        toast.error('Failed to delete task');
      }
    }
  };
  

  return (
    <div>
      <div className='p-6 ml-12 '>
    
      <Button variant="destructive" onClick={handleDeleteTask} className='border-2 border-slate-600'>
          Delete Task
      </Button>
  </div>
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
     
      <ToastContainer />
      <h1 className="text-2xl mb-8 text-center font-bold text-blue-600">Edit Task</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-600 font-bold">Task Name:</label>
          <input
            type="text"
            name="task_name"
            value={formData?.task_name || ''}
            className="border p-2 w-full rounded-md"
            onChange={handleChange}
            required
          />
        </div>

        <div className='mb-4'>
          <label className="block text-gray-600 font-bold">Description:</label>
          <textarea
            name="description"
            value={formData?.description || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
            required
          ></textarea>
        </div>

        <div className='mb-4'>
          <label className="block text-gray-600 font-bold">Priority:</label>
          <select
            name="priority"
            value={formData?.priority || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
            required
          >
            <option value="">Select Priority</option>
            <option value="HIGHEST">HIGHEST</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>

        <div className='mb-4'>
          <label className="block text-gray-600 font-bold">Status:</label>
          <select
            name="status"
            value={formData?.status || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
            required
          >
            <option value="">Select Status</option>
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className='mb-4'>
          <label>Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={formData?.start_date || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>

        <div className='mb-4'>
          <label>End Date:</label>
          <input
            type="date"
            name="end_date"
            value={formData?.end_date || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Update Task</button>
      </form>
    </div>
  );
    </div>
  )
};

export default EditTaskPage;
