"use client";

import React from "react";
import { saveDoc } from "@/userActions/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import { useActionState } from "react";
const initialState = { ok: null,status:"" };

const Page= () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [state, formAction] = useActionState(saveDoc, initialState);
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);
 
  

  return (
     <div className="h-screen flex items-center">
      <div className="h-2/3 w-screen flex justify-center text-white text-sm lg:text-lg ">
        <form
          action={formAction}
          className="flex flex-col w-3/4 lg:w-1/2 bg-[rgba(255,255,255,0.1)] p-4 space-y-3 rounded-2xl "
        >
          <div className="flex flex-col  space-y-3">
            <label htmlFor="Data">Data:</label>
            <input
              type="text"
              id="Data"
              placeholder="Enter the data that you want to save . . ."
              name="data"
             required
              className="p-2 rounded border-2 border-gray-600 text-[10px] sm:text-sm"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label htmlFor="Alias">Alias:</label>
            <input
              type="text"
              id="Alias"
              placeholder="Enter the alias name for your data . . ."
              name="alias"
              required
              className="p-2 rounded border-2 border-gray-600 text-[10px] sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-700 hover:bg-orange-800 text-white p-2 rounded transition  "
          >
            Save
          </button>
           {state.ok === false && <p style={{ color: "red" }}>{state.status}</p>}
            {state.ok === true && <p style={{ color: "green" }}>{state.status}</p>}
        </form>
      </div>
    </div>
   
  );
};

export default Page;
