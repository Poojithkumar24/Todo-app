'use client'

import useSWR from 'swr';

type Task = {
  task_name: string;
  description: string;
  priority: string;
  status: string;
  start_date: string;
  end_date: string;
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return await response.json();
};

const ExportCsv = () => {
  const { data: tasks, error } = useSWR<Task[]>('http://localhost:4000/api/task/', fetcher);

  const downloadCSV = (tasks: Task[]) => {
    if (tasks) {
      // Define fields to exclude
      const excludedFields = ['userId', 'task_id'];
  
      // Filter out excluded fields
      const filteredTasks = tasks.map((task: Task) => {
        const filteredTask = { ...task };
        excludedFields.forEach(field => {
          if (filteredTask.hasOwnProperty(field)) {
            delete filteredTask[field as keyof Task];
          }
        });
        return filteredTask;
      });
      
  
      // Generate CSV content
      const csvContent = 'data:text/csv;charset=utf-8,' + 
                         filteredTasks.map(task => 
                           Object.values(task).join(',')
                         ).join('\n');
      
      // Create and trigger download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'tasks.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  

  if (error) return <div>Error loading tasks</div>;
  if (!tasks) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => downloadCSV(tasks)}>Download CSV</button>

    </div>
  );
};

export default ExportCsv;
