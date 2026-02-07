"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/userActions/actions";
import { getUser } from "@/userActions/actions";

const Page= () => {
  const [File, setFile] = useState("NO FILE SELECTED");
  const { data: session, status } = useSession();

  const [name, setname] = useState("")
  const [contact, setcontact]=useState("")
  const [picurl, setpicurl] = useState("profilepics/unknownUserImage.jpg")
  const router = useRouter();

  async function handleSubmit(formData) {
  await updateUser(formData);
  window.location.reload()
}

  const loadstates= async()=>{
    if(session){
        getUser(session.user.email).then((response)=>{
          if(response){
            setname(response.name)
            setcontact(response.contact)
            setFile(response.picname)
            setpicurl(response.picurl)
          }
          else{
            setname(session.user.name)
          }
        })
      }
  }
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else{
      loadstates()
    }

  }, [status]);

  return (
    <>

    {session && <div className="p-1" >
        {/* generate user profile form with name, contact number, email address, profile picture, education field , with add more option and format the file in professional mannerism , also add labels*/}

        <form className="flex flex-col space-y-3 text-sm  lg:text-lg text-white w-6/7 sm:w-3/4 lg:w-1/2 mx-auto mt-5 bg-[rgba(255,255,255,0.1)] p-4 rounded-2xl mb-10" action={handleSubmit}>
        <div className="flex gap-10"> <img id="profilepic" src={picurl}  alt="pic"  className="rounded-full border-4 border-white object-contain bg-white w-[75px] h-[75px]  "   /> <div className="flex justify-start gap-4 items-center">
            <label
              htmlFor="file"
              className="cursor-pointer px-2 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition  text-center"
            >
              Profile Picture
            </label>
            <span className="text-white">{File}</span>
          </div>

          <input
            id="file"
            type="file"
            name="profilepic"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              setFile(
                e.target.files.length > 0
                  ? e.target.files[0].name
                  : "NO FILE SELECTED"
              );
            }}
          /></div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            
            value={name} onChange={(e)=>setname(e.target.value)}
            className="p-2 rounded border-2 border-gray-600"
          />
          <label>Contact Number:</label>
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={contact}
            onChange={(e)=>setcontact(e.target.value)}
            className="p-2 rounded border-2 border-gray-600"
          />
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            defaultValue={session.user.email}
            readOnly
            className="p-2 rounded border-2 border-gray-600"
          />

          
         

           

          <button type="submit" className="bg-orange-700 hover:bg-orange-800 active:bg-black  text-white  p-2 rounded transition" >
          Update Details
        </button>
        </form>

       
      </div>}
    
      </>
  
  );
};

export default Page;
