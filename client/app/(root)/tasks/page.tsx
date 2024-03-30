'use client'

import React, { useState, useEffect } from 'react';
import { Task, columns } from "../_components/columns";
import { DataTable } from "../_components/data-table";
import ExportCsv from "@/components/ExportCsv"
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
  const router  = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      const loggedIn = await isLogin();
      if (!loggedIn.auth) {
        router.push("/login");
      }
      const fetchedData = await getData();
      setData(fetchedData);
    };

    fetchData();
  }, []); 
  

  return (
    <div>
        <div className='flex justify-start items-center  ml-24 gap-3'>
        <Link href={'/createtask'}>
          <Button>
              Create task
          </Button> 
        </Link>
        <div>
          <Button  variant="green">
              <ExportCsv />
          </Button> 
        </div>
        <Link href={'/import-task'}>
          <Button  variant="blue">
              Import CSV
          </Button> 
        </Link>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
