// pages/TasksPage.tsx
'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/task');
        setTasks(response.data);
        setFilteredTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter(task =>
      task.task_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchTerm, tasks]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Tasks</h1>

      <input
        type="text"
        placeholder="Search by task name"
        className="border-4 border-black p-2 mb-8 w-full rounded-2xl "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="min-w-full border-collapse border-4 border-gray-700 shadow-2xl rounded-2xl">
        <thead className='bg-sky-200'>
          <tr>
            <th className="border p-2">Task Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Priority</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.task_id}>
              <td className="border p-2">{task.task_name}</td>
              <td className="border p-2">{task.description}</td>
              <td className="border p-2">{task.priority}</td>
              <td className="border p-2">{task.status}</td>
              <td className="border p-2">{task.start_date}</td>
              <td className="border p-2">{task.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksPage;
