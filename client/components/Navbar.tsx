'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logOut } from "@/utils/auth";
import { toast } from 'react-toastify';
import { getUserId } from '@/utils/auth';
import { Menu ,LogOut,X} from 'lucide-react';
import { baseURL } from '@/utils/constant';
import axios from 'axios';
import Image from "next/image";

type User = {
  name: string;
  email: string;
  profilepic: string;
};

const Navbar = () => {
  const currentUserId = getUserId();
  const router = useRouter();
  const [user,setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut();
    toast.success("Logout Successfully");
    router.push("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (currentUserId) {
      fetchUserById(currentUserId); 
    }
  }, [currentUserId]);

  const fetchUserById = async (currentUserId: any) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/user/${currentUserId}`);
      
      setUser(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };


  return (
    <div className="relative flex justify-between items-center mb-8 p-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-md shadow-md">
      <h1 className="text-3xl font-semibold text-white">TODO APP</h1>
      <div className="relative">
        <div onClick={toggleMenu} className="bg-gray-200 text-black px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out cursor-pointer border-2 border-black">
          {isMenuOpen &&
            <X />
          }
          {!isMenuOpen && 
            <Menu />
          }
        </div>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <ul className="py-1">
              <li>
                <button
                  onClick={() => {
                    router.push(`/users/${currentUserId}`);
                    toggleMenu();
                  }}
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  <div className="mr-2 rounded-full overflow-hidden w-10 h-10">
                      <Image 
                        alt="profile picture" 
                        src={user?.profilepic || "https://utfs.io/f/31ddbb27-82d9-43cb-8e9c-7a820459f918-2558r.jpg"} 
                        width={40} 
                        height={40} 
                        className="rounded-full"
                      />
                    </div>
                  {user?.name}
                </button>

              </li>
              <li>
              <button
                onClick={() => {
                  handleLogOut();
                  toggleMenu();
                }}
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                <LogOut className="m-2" /> 
                Logout
              </button>

              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
