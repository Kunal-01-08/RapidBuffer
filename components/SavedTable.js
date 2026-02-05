import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import { deleteDoc } from "@/userActions/actions";
import { getsavedDoc } from "@/userActions/actions";

const SavedTable = ({email}) => {
  const [render, setrender] = useState(0);
  const [List, setList] = useState([])

  const handleDelete = async (docname, email) => {
    await deleteDoc(docname, email);
    setrender(!render);
  };

  useEffect(() => {
   
            getsavedDoc(email).then((response)=>{
              setList([...response]);
              console.log(response);
            })
          
  }, [render])
  
  useEffect(() => {
    // Load Lordicon script once
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {List.length == 0 && <div className="text-white flex justify-center font-extrabold text-xl m-20">NO SAVED DOCUMENTS TO LOAD . . .</div>}
      {List.length > 0 && (
        
          <table className="w-full mt-5 text-sm md:text-lg flex text-white flex-col justify-start gap-4">
            <thead className="bg-gray-800 p-2 text-yellow-400">
              <tr className="flex justify-around items-center">
                <th
                  className=" w-1/3 m-1 mx-3  px-2 py-3 rounded-tr-2xl bg-black rounded-bl-2xl "
                  style={{ border: "2px solid white" }}
                >
                  Alias
                </th>
                <th
                  className=" w-1/3 m-1 mx-3  px-2 py-3 rounded-tr-2xl bg-black rounded-bl-2xl"
                  style={{ border: "2px solid white" }}
                >
                  Data
                </th>
               
                <th
                  className=" w-1/3 m-1  mx-3 px-2 py-3 rounded-tr-2xl bg-black rounded-bl-2xl"
                  style={{ border: "2px solid white" }}
                >
                  Delete
                </th>
              </tr>
            </thead>

            <tbody>
              {List.map((doc, idx) => {
                return (
                   <tr key={idx}
                      className="flex justify-around text-sm group items-center py-2 bg-[rgba(255,157,0,0.13)] hover:bg-amber-700"
                    >
                      <td className="p-1 border-1 border-yellow-500 border-dashed w-1/3 m1 mx-7 bg-blue-900 truncate group-hover:overflow-y-auto group-hover:text-wrap hover:wrap-break-word text-center h-8 ">{doc.alias}</td>
                       <td className="p-1 border-1 border-yellow-500 border-dashed w-1/3 m1 mx-7 bg-blue-900 truncate group-hover:overflow-y-auto group-hover:text-wrap group-hover:wrap-break-word text-center h-8 ">{doc.data}</td>

                      

                      <td className="w-1/3 m1  border-1 border-yellow-500 border-dashed  mx-7 bg-blue-900  flex justify-around ">
                        {/* <button className="px-2  rounded">
                          <lord-icon
                            src="https://cdn.lordicon.com/fjvfsqea.json"
                            trigger="click"
                            colors="primary:#ffffff,secondary:#a39cf4"
                            style={{ width: "40px", height: "40px" }}
                          ></lord-icon>
                        </button> */}

                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleDelete(doc.alias, email);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="click"
                            colors="primary:#ffffff,secondary:#a39cf4"
                            style={{ width: "30px", height: "30px" }}
                          ></lord-icon>
                        </button>
                      </td>

                    </tr>
                );
              })}
            </tbody>
          </table>
        
      )}
    </>
  );
};

export default SavedTable;
