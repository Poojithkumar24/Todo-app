// ImportCsv.tsx
'use client'

import React, { useState } from 'react';
import Papa from 'papaparse';

type Task = {
  task_name: string;
  description: string;
  priority: string;
  status: string;
  start_date: string;
  end_date: string;
};

const ImportCsv = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const parsedData = await parseCSV(file);
        await submitData(parsedData);
        alert('CSV data uploaded successfully!');
      } catch (error) {
        console.error('Error uploading CSV:', error);
        alert('Error uploading CSV. Please try again.');
      }
    }
  };

  const parseCSV = (file: File): Promise<Task[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          resolve(result.data as Task[]);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  };

  const submitData = async (data: Task[]) => {
    try {
      const response = await fetch('http://localhost:4000/api/task/bulk_add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Import CSV</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded-md">
        Upload CSV
      </button>
    </div>
  );
};

export default ImportCsv;
