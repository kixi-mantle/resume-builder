"use client"

import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [resumePosition, setResumePosition] = useState(0);

  useEffect(() => {
    // Simple floating effect
    const interval = setInterval(() => {
      setResumePosition((prev) => (prev >= 10 ? -10 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center overflow-hidden">
      {/* Floating Resume Background */}
      <Image
        src="/logo.png"
        width={40} // Replace with your actual image path
        height={40} // Replace with your actual image path
        alt="Resume"
        className="absolute opacity-20 w-72 sm:w-96"
        style={{
          top: `calc(50% + ${resumePosition}px)`,
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 text-center p-6">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4">
          Build your perfect resume for free
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6">
          You type the data, we create the resume.
        </p>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg sm:text-xl hover:bg-blue-700 transition shadow"
          onClick={()=>{
           
            redirect('/dashboard')
            }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Page;
