"use client";

import { isLogin} from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {getUserId} from '@/utils/auth'
import axios  from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";


type User = {
  name: string;
  email: string;
  profilepic: string;
};

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  

  const currentUserId = getUserId();

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (!loggedIn.auth) {
        router.push("/login");
      } else {
        
        setUser(loggedIn.data);
      }
    };

    authenticate();
  }, []);

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

  console.log(user);

  return (
    <main className="h-screen w-full">
      <div className="h-screen flex flex-col items-center ">
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-green-500 to-yellow-400 text-transparent bg-clip-text ">TODO APP</h1>
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 text-transparent bg-clip-text mb-16">Welcome! {user?.name}</h1>
          <Link href={'/tasks'}>

          <Button variant="default" size="extraLarge">
              View Tasks
          </Button>
          </Link>
      </div>
    </main>

  );
}