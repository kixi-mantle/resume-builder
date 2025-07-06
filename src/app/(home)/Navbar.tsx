"use client";

import { useEffect, useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { getUserFromSession } from "../../action/auth";
import { Button } from "../../components/ui/button";


export default function Navbar() {
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      startTransition(async () => {
        const res = await getUserFromSession();
        
        
        const {data} = res;
        if(!data){
            setUser(null)
            return
        }
        setUser({ name: data.name, email: data.email });
      });
    };
    getUser();
  }, []);

 

  return (
    <nav className="fixed h-[4.5rem] top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo/Home Button */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => redirect("/dashboard")}
          >
             <svg width="160" height="160" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="60" r="50" fill="url(#gradient)"/>
  
  <path d="M45 40L75 40L75 70L45 70L45 40Z" fill="white" stroke="white" strokeWidth="2"/>
  <path d="M55 45L65 45M55 50L70 50M55 55L65 55M55 60L70 60" stroke="#4338CA" strokeWidth="2" strokeLinecap="round"/>
  <path d="M80 35L60 55L50 45L70 25L80 35Z" fill="#4F46E5"/>
  <path d="M70 25L80 35L60 55L50 45L70 25Z" stroke="white" strokeWidth="2"/>
  
  <text x="120" y="70" fontFamily="Inter, sans-serif" fontSize="40" fontWeight="600" fill="#111827">ResumeCraft</text>
  
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#4F46E5"/>
      <stop offset="100%" stop-color="#4338CA"/>
    </linearGradient>
  </defs>
</svg>
            
            
          </div>

          {/* User dropdown */}
         
         <div className="px-2 w-fit h-fit rounded-md">

            {
                isPending ? (
                    <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                ) : user ? (
                    <Button className="bg-blue-500" onClick={()=>redirect('/dashboard')}>Dashboard</Button>

                ):
                (
                  <Button className="bg-red-500" onClick={()=>redirect('/signin')}>Signin</Button>

                )
            }

         </div>
        </div>
      </div>
    </nav>
  );
}