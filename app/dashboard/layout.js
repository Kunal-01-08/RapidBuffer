"use client"
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
   useEffect(() => {
     
      const script = document.createElement("script");
      script.src = "https://cdn.lordicon.com/lordicon.js";
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, []);

  return (

    <div >

      <Navbar />
      {children}

    </div>
   
 
  );
}
