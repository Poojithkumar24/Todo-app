'use client'

import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/image-upload";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        name,
        email,
        password, 
        profilePic
      });

      console.log('Signup successful:', response.data);
      router.push('/login');
    } catch (error: any) {
      console.error('Signup Error:', error.message);
      
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl flex">

        {/* Left Column */}
        <div className="flex-1 space-y-6 pr-8">
          <h1 className="text-3xl mb-6 font-bold">Sign Up</h1>

          <form onSubmit={handleSignup} className="space-y-6">

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Confirm Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Sign Up
            </button>

            {/* Login Link */}
            <div className="mt-4 text-center">
              <Link href="/login" className='text-sm text-blue-500 hover:underline'>
                Already have an account?
              </Link>
            </div>
          </form>
        </div>

        {/* Right Column */}
        <div className="flex-1">
      <div className="mt-6 border rounded-md p-4">
        <div className="font-medium flex items-center justify-between mb-4">
          Profile Picture
          <Button onClick={toggleEdit} variant="ghost">
                {isEditing && (
                  <>Cancel</>
                )}
                {!isEditing && profilePic.length===0 && (
                  <>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add an image
                  </>
                )}
                {!isEditing && profilePic.length!==0 && (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit image
                  </>
                )} 
              </Button>
        </div>
        {!isEditing && (
              profilePic.length===0 ? (
                <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                  <ImageIcon className="h-10 w-10 text-slate-500" />
                </div>
              ) : (
                <div className="relative aspect-video mt-2">
                  <Image
                    alt="Upload"
                    fill
                    className="object-cover rounded-md"
                    src={profilePic}
                  />
                </div>
              )
            )}


            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="profilePic"
                        onChange={(url) => {
                          if (url) {
                              setProfilePic(url);
                              console.log(profilePic.length===0)
                              toggleEdit();
                              router.refresh();
                          } 
                        }}
                      />          
                </div>
            )}

      </div>
    </div>

      </div>
    </div>
  );
}
