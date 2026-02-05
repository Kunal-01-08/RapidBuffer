
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  
  return (
    <>
   
    <img src="logo.png" className=" w-40 lg:w-60 absolute m-4 " alt="" />

  
    <div className="flex flex-col items-center gap-8 pt-40 h-4/5">

    <div className=" flex gap-4 items-center text-[#73f97e] text-4xl md:text-6xl font-extrabold text-center ">Rapid Buffer <img src="resumegif.gif" className=" w-15 md:w-20" alt="" /></div>
 

    <p className="text-indigo-400 font-extrabold text-3xl md:text-4xl px-5 text-center ">Save text once, retrieve it instantly anywhere . . .</p>

    {/* a  div with two buttons for read more and get started */}
    <div className="flex flex-col sm:flex-row gap-10 mt-4">
      <Link href={"/about"}>
      <button className="bg-purple-500 text-white py-2 px-4 rounded hover:cursor-pointer hover:font-bold w-40 hover:bg-purple-700">Read More</button>
      </Link>

      <Link href="/login">
      <button className="bg-purple-500 text-white py-2 px-4 rounded hover:cursor-pointer hover:font-bold w-40 hover:bg-purple-700">Get Started</button>
      </Link>
    </div>

    <div className="bg-gray-700 h-full w-full flex flex-col md:flex-row justify-around p-4 rounded-2xl items-center gap-5 ">
      <div className="bg-[rgb(0,0,0,0.5)] w-4/5 md:w-1/3 flex  flex-col justify-start py-4 items-center border-2 border-white h-full rounded-4xl">
      <img src="gif1.gif" className="w-15 bg-[rgb(255,255,255,0.2)] m-2 rounded-2xl " alt="" />
      <p className="text-xl w-9/10 italic text-white">Forget things often?, Don&apos;t worry, save your data with us and give it an alias name to retreive later.</p>
      </div>
       <div className="bg-[rgb(0,0,0,0.5)] w-4/5 md:w-1/3 flex flex-col justify-start py-4 items-center border-2 border-white h-full rounded-4xl">
      <img src="gif2.gif" className="w-30 rounded-2xl m-2" alt="" />
       <p className="text-xl w-9/10 italic text-white">Use our extension RBS to retreive the data later on using the alias names.</p>
  
      </div>
       <div className="bg-[rgb(0,0,0,0.5)] w-4/5 md:w-1/3 flex justify-start  py-4 items-center flex-col border-2 border-white h-full rounded-4xl">
      <img src="gif3.gif" className="w-15 bg-[rgb(255,255,255,0.2)] m-2 rounded-2xl" alt="" />
      {/* heart symbol in text */}
      <p className="text-xl w-9/10 italic text-white">Available to your service 24X7 for absolutely free. Your love ❤️ is our capital. </p>

      </div>

    </div>

    </div>

    </>
  );
}
