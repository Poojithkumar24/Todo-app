'use client'

import CreateTask from "../_components/CreateTask"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLogin } from "@/utils/auth";

const createTask = () => {
  const router = useRouter();
  
  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (!loggedIn.auth) {
        router.push("/login");
      }
    };

    authenticate();
  }, []);

  return ( 
    <CreateTask />
   );
}
 
export default createTask;