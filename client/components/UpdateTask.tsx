'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Task = {
  _id: string;
  task_name: string;
  description: string;
  priority: string;
  status: string;
  start_date: string;
  end_date: string;
};

const TaskUpdate = () => {
  const [taskId, setTaskId] = useState<string>('');
  const [task, setTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<Task | null>(null);

  useEffect(() => {
    if (taskId) {
      fetchTaskById(taskId);
    }
  }, [taskId]);

  const fetchTaskById = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/task/${id}`);
      if (response.data) {
        setTask(response.data);
        setFormData(response.data);
      }
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (task) {
      const { name, value } = event.target;
      setFormData({ ...formData!, [name]: value });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData) {
      try {
        const response = await axios.put(`http://localhost:4000/api/task/${taskId}`, formData);
        if (response.status === 200) {
          alert('Task updated successfully!');
          setTaskId('');
        }
      } catch (error) {
        console.error('Error updating task:', error);
        alert('Error updating task. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Update Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Task ID:
          <input
            type="text"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            required
          />
        </label>
        <br />
        {formData && (
          <>
            <label>
              Task Name:
              <input
                type="text"
                name="task_name"
                value={formData.task_name}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </label>
            <br />
            <label>
              Priority:
              <input
                type="text"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Status:
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Start Date:
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              End Date:
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
              Update Task
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default TaskUpdate;
