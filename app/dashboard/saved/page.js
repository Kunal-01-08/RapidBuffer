'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';
import SavedTable from '@/components/SavedTable';
import { getsavedDoc } from '@/userActions/actions';
const Page= () => {
   const { data: session, status } = useSession();
  
  
      const router = useRouter();
      
      useEffect(() => {          
         
          if (status === "unauthenticated") {
              router.push('/login');
          }
          
  
      }, [status,]);
   
  
  return (
    <div>

       {session&&<SavedTable email={session.user.email} />}
    </div>
  )
}

export default page
