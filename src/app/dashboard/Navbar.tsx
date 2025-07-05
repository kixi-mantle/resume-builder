"use client";

import { User, LogOut, Home, UserCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { getUserFromSession, logout } from "../../action/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      startTransition(async () => {
        const res = await getUserFromSession();
        
        if (!res.data) {
        redirect('/signin')
        }
        const {data} =  res;
        setUser({ name: data.name, email: data.email });
      });
    };
    getUser();
  },[]);

  const handleLogOut = () => {
    startTransition(async () => {
      await logout();
        setUser(null)
     
      redirect('/signin')
    });
  };

  return (
    <nav className="fixed h-[4rem] top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b shadow-lg border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo on the left */}
          <div className="aspect-square items-center rounded-full border-2 border-blue-500 h-[65%] flex justify-center bg-gray-100 hover:bg-blue-500 cursor-pointer hover:text-white" onClick={()=> redirect("/dashboard")}>
           <Home className=""/>
          </div>

          {/* User dropdown */}
          
 <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-1 rounded-full focus:outline-none border-2 bg-gray-200 border-blue-400  hover:bg-blue-500 hover:text-white cursor-pointer "
                disabled={isPending}
              >
                <User className="h-8 w-8 " />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {isPending ? (
                <DropdownMenuLabel className="text-center text-gray-500">
                  Loading...
                </DropdownMenuLabel>
              ) : user ? (
                <>
                  <DropdownMenuLabel >
                    <div className="font-medium text-center text-xl text-accent ">{user.name}</div>
                    <div className="text-sm text-gray-500 text-center">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCircle className="mr-2"/>My profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogOut}
                    disabled={isPending}
                    className="text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {isPending ? "Logging Out..." : "Logout"}
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuLabel className="text-center text-red-600">
                  Failed to load user
                </DropdownMenuLabel>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
         
         
        </div>
      </div>
    </nav>
  );
}
