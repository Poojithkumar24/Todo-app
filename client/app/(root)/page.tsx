'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  
import { getUserId, removeToken } from '@/utils/auth';
import Navbar from '@/components/Navbar';
import ExportCsv from '@/components/ExportCsv';  
import { isAuthenticated } from '@/utils/auth';
import Link from 'next/link';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
type Task = {
  task_id: string;
  task_name: string;
  description: string;
  priority: string;
  status: string;
  start_date?: string;
  end_date?: string;
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const userId = getUserId();

  const router = useRouter();

  

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
    
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/task/`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setTasks(data);
        setFilteredTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [userId]);

  useEffect(() => {
    const filtered = tasks.filter(task =>
      task.task_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchTerm, tasks]);

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  const handleCreateTask = () => {
    router.push('/createtask');
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/task/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      
      const updatedTasksResponse = await fetch(`http://localhost:4000/api/task/`);
      const updatedTasks = await updatedTasksResponse.json();

      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);

      
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="container mx-auto p-4">
       <ToastContainer />
      <input
        type="text"
        placeholder="Search by task name"
        className="border-4 border-black p-2 mb-8 w-full rounded-2xl"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex justify-start mb-4">
        <button 
          onClick={handleCreateTask}
          className="bg-black text-white p-2 rounded-md mr-4"
        >
          Create Task
        </button>

         
        <div className='bg-blue-500 text-white p-2 rounded-md mr-4'>
          <ExportCsv />
        </div> 

        <Link href={'/import-task'}>
        <button
          
          className='bg-green-500 text-white p-2 rounded-md mr-4'
        >
          Import CSV 
        </button>
        </Link> 
      </div>
      

      <table className="min-w-full border-collapse border-4 border-gray-700 shadow-2xl">
        <thead className='bg-sky-300 '>
          <tr className='border-4 border-gray-600'>
            <th className="border p-2">Task Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Priority</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>

            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.task_id}>
              <td className="border p-2">{task.task_name}</td>
              <td className="border p-2">{task.description}</td>
              <td className="border p-2">{task.priority}</td>
              <td className="border p-2">{task.status}</td>
              <td className="border p-2">{formatDate(task.start_date)}</td>
              <td className="border p-2">{formatDate(task.end_date)}</td>
              <td className="border p-2">
                <button 
                  onClick={() => handleDeleteTask(task.task_id)}
                  
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksPage;
