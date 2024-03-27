'use client'

import React, { useState, useEffect } from 'react';
import { Task, columns } from "../_components/columns";
import { DataTable } from "../_components/data-table";

async function getData(): Promise<Task[]> {
  const response = await fetch(`http://localhost:4000/api/task/`);
  const data = await response.json(); // added await here

  return data;
}

export default function DemoPage() {
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      setData(fetchedData);
    };

    fetchData();
  }, []); 

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
