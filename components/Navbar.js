"use client"
import { signOut } from 'next-auth/react'
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { redirect } from 'next/navigation';


const Navbar = () => {

    const pathname = usePathname();
    const isActive = (path) => {
        return pathname.includes(path) ? 'bg-orange-700 border-orange-800' : '';
    };
   
    
  return (
    <div className='text-white text-sm md:text-md lg:text-lg bg-gray-600 py-1 px-8 flex flex-col sm:flex-row sm:justify-between sm:items-center '>
    
        {/* 4 buttons , profile, Saved , Logout, Home inside Link and then inside button */}
        <div className='flex gap-4'>
        <Link href="/dashboard/profile"  >
          <button className={ `border-2 border-gray-700 p-1 hover:bg-blue-700 hover:border-blue-800 ${isActive('/dashboard/profile')}`} style={{boxShadow: "2px 2px 2px rgba(0, 0, 0, 1)"}}>Profile</button>
        </Link>
        <Link href="/dashboard/insert" >
          <button className={`border-2 border-gray-700 p-1 hover:bg-blue-700 hover:border-blue-800 ${isActive('/dashboard/insert')}`} style={{boxShadow: "2px 2px 2px rgba(0, 0, 0, 1)"}}>Insert</button>
        </Link>
        <Link href="/dashboard/saved" >
          <button className={`border-2 border-gray-700 p-1 hover:bg-blue-700 hover:border-blue-800 ${isActive('/dashboard/saved')}`} style={{boxShadow: "2px 2px 2px rgba(0, 0, 0, 1)"}}>Saved</button>
        </Link>
       
       </div>
       <div className='flex justify-between sm:w-30 mt-3 items-center '>
         <button className='bg-red-800 px-1 py-1 rounded-full hover:bg-red-900 text-center align-middle border-1 border-white' onClick={()=>redirect("/")}>
            <lord-icon
    src="https://cdn.lordicon.com/jeuxydnh.json"
    trigger="hover"
    stroke="bold"
    state="loop-3d-roll"
    colors="primary:#ffffff,secondary:#ffffff"
    // style={{width:"40px" ,height:"40px"}}
    className="w-6 h-6 sm:w-6 sm:h-6"
    >
      
</lord-icon>
          </button>

          <button className='bg-red-800 px-3 py-1 h-fit rounded-full hover:bg-red-900 text-center align-middle border-1 border-white' onClick={signOut}>Logout</button>
       </div>
         

    </div>
  )
}

export default Navbar
