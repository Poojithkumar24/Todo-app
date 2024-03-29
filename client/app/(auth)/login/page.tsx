'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link'; 
import{baseURL} from "@/utils/constant"
import { toast } from 'react-toastify';
import {setAuthentication, setUserId} from "@/utils/auth"

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload={
      email,
      password
    }

    try {
      const response = await axios.post(`${baseURL}/auth/login`,payload).then((res)=>{
        setAuthentication(res.data.token);
        setUserId(res.data.userId);
        toast.success(
          <div>Logged in Successfully</div>
        )
      });
      
      router.push('/');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-2xl mb-4">Login</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        
        <div className="mt-4 text-center">
          <Link href="/signup" className='text-sm text-slate-600 underline'>
            Dont have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
