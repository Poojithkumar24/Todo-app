"use client";

import { isLogin} from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userId } from "@/utils/auth";
export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "" });
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setUser(loggedIn.data);
        setPageReady(true);
      } else {
        router.push("/login");
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