'use client'
import Image from "next/image";
import { getUserId } from "@/utils/auth";
import { baseURL } from "@/utils/constant";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

type User = {
  name: string;
  email: string;
  profilepic: string;
};

const UserId = () => {
  const [user, setUser] = useState<User | null>(null);
  
  const userId = useParams();
  const currentUserId = getUserId();
  const router = useRouter();
  useEffect(()=>{
   if(userId.userId!==currentUserId){
      router.push('/')
    }
  })

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

  console.log('User image:', user); 
  

  return (
    <div>
      {user?.profilepic ? (
        <Image alt="profile picture" src={user?.profilepic} width={200} height={200} />
      ) : (
        <p>No profile picture available</p>
      )}
      {user?.name}
      {user?.email}
    </div>
  );
};

export default UserId;
