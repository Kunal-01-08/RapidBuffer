"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { signIn, signOut } from "next-auth/react";

const Page= () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(()=>{
    if (status === "authenticated") {
      router.push('/dashboard/profile');
    }
  }, [session]);

 
  return (
    <>
   
      {/* two partitions with flex */}
      <div className="flex h-screen text-white text-center">
        <div className="w-full flex justify-center items-center">
          {/* github and google signin with formatted buttons */}
          <div className="flex flex-col p-4  w-1/2 bg-[rgb(255,255,255,0.1)] rounded-2xl">
            {/* heading for using authorization fully formatted professionally*/}
            <h2 className="text-2xl font-bold self-center mb-4 ">Sign in with</h2>
            {/* buttons for github and google signin */}

            <button className="flex items-center cursor-pointer justify-center mb-4 p-2 border border-gray-300 rounded group hover:bg-white hover:text-black transition-colors duration-300" onClick={() => signIn("github")}>
              <img
                src="/github-icon.svg"
                alt="GitHub"
                className="w-10 mr-2 invert group-hover:invert-0"
              />
              Sign in with GitHub
            </button>
            <button className="flex items-center cursor-pointer justify-center p-2 border border-gray-300 rounded group hover:bg-white hover:text-black transition-colors duration-300" onClick={()=>signIn("google")}>
              <img
                src="/google-icon.svg"
                alt="Google"
                className="w-10 mr-2 invert group-hover:invert-0"
              />
              Sign in with Google
            </button>
          </div>

          {/* Right partition content */}
        </div>
      </div>
    </>
  );
};

export default page;
