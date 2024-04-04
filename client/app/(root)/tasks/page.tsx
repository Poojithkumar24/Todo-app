'use client'

import React, { useState, useEffect } from 'react';
import { Task, columns } from "../_components/columns";
import { DataTable } from "../_components/data-table";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getUserId, isLogin } from '@/utils/auth';
import { useRouter } from 'next/navigation';

async function getData(): Promise<Task[]> {
  const userId = getUserId();
  const response = await fetch(`http://localhost:4000/api/task/user-tasks/${userId}`);
  const data = await response.json(); 

  return data;
}

export default function DemoPage() {
  const [data, setData] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const loggedIn = await isLogin();
      if (!loggedIn.auth) {
        router.push("/login");
      }
      const fetchedData = await getData();
      setData(fetchedData);
      setFilteredData(fetchedData);
    };

    fetchData();
  }, []); 

  useEffect(() => {
    const filterTasks = () => {
      const filtered = data.filter(task => {
        const { task_name, description } = task;
        const lowerCaseQuery = searchQuery.toLowerCase();
        
        return (
          task_name.toLowerCase().includes(lowerCaseQuery) ||
          description.toLowerCase().includes(lowerCaseQuery)
        );
      });
      setFilteredData(filtered);
    };

    filterTasks();
  }, [searchQuery, data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='min-h-screen'>
    <div className="container mx-auto py-4">
      <input
        type="text"
        placeholder="Search tasks by name or description"
        value={searchQuery}
        onChange={handleSearchChange}
        className="border-2 border-gray-500 p-2 w-full rounded-2xl mb-4 bg-gray-600 text-white"
      />
    </div>
    <div className='flex justify-end items-center mr-24 gap-3'>
      <Link href={'/createtask'}>
        <Button>
            Create task
        </Button> 
      </Link>
    </div>
    <div className="container mx-auto py-6">
      <DataTable columns={columns} data={filteredData} />
    </div>
  </div>
  );
}
