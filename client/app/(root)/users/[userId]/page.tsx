'use client'

import Image from "next/image";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/image-upload";
import { baseURL } from "@/utils/constant";

import axios from "axios";

const formSchema = z.object({
    profilePic: z.string().min(1, {
      message: "Image is required",
    }),
});

  


const UserId = () => { 
 
   return(
    <div>
        user ID page
    </div>
   )
} 
 
export default UserId; 


