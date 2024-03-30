"use client";

import { isLogin} from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {getUserId} from '@/utils/auth'
import { get } from "http";
export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "" });
  const [pageReady, setPageReady] = useState(false);

  const userId = getUserId()

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (!loggedIn.auth) {
        router.push("/login");
      } else {
        
        setUser(loggedIn.data);
        setPageReady(true);
      }
    };

    authenticate();
  }, []);

  

 

  return (
    <main
      className={`${
        pageReady ? "block" : "hidden"
      } w-full h-screen grid place-items-center`}
    >
      <div className="p-4 bg-accentDark text-white w-[400px]  h-[350px] flex justify-center flex-col items-center text-center space-y-4 rounded-lg shadow-2xl bg-sky-600">
        <p> Welcome!</p>
        <p>{user?.email}</p>
        
      </div>
    </main>
  );
}