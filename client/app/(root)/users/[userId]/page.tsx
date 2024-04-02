'use client'

import Image from "next/image";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/image-upload";
import { baseURL } from "@/utils/constant";

import { generateUploadButton } from "@uploadthing/react";
import axios from "axios";

const formSchema = z.object({
    profilePic: z.string().min(1, {
      message: "Image is required",
    }),
  });

  


const UserId = () => {

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            axios.patch(`${baseURL}/auth/`)
          console.log("succeess")
        } catch {
          console.log("error")
        }
      }

    return ( 
        <div>
             <FileUpload
                endpoint="profilePic"
                onChange={(url) => {
                  if (url) {
                    onSubmit({ profilePic: url });  
                    
                  } 
                }}
              />     
        </div>
     );
} 
 
export default UserId; 


