'use client'

import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="flex justify-between items-center mb-8 p-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-md shadow-md">
      <h1 className="text-3xl font-semibold text-white">TODO APP</h1>
      <div className="space-x-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
        >
          Logout
        </button>
        
      </div>
    </div>
  );
};

export default Navbar;
