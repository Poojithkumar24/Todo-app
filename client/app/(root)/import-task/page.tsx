'use client'
import ImportCsv from '@/components/ImportCsv'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isLogin } from '@/utils/auth';

const ImportTask = () => {

    const router = useRouter()
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
        <div>
            <ImportCsv />
        </div>
     );
}
 
export default ImportTask;