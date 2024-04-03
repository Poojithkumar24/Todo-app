

import Navbar from "@/components/Navbar";
import { ToastContainer ,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <div className="bg-gray-200">
        <div>
          <Navbar />
        </div>
        <ToastContainer />
        {children}
      
      </div>
  );
}
