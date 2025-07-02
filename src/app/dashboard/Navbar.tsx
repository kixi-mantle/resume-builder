"use client";

import Image from "next/image";
import { User, LogOut } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { logout } from "../../action/auth";
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
        const res = await fetch("/api/user");
        if (!res.ok) {
          redirect("/signin");
          return;
        }
        const data = await res.json();
        setUser({ name: data.name, email: data.email });
      });
    };
    getUser();
  }, []);

  const handleLogOut = () => {
    startTransition(async () => {
      await logout();
      redirect('/signin')
    });
  };

  return (
    <nav className="fixed h-[4rem] top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b shadow-lg border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0 flex items-center">
            <Image
              width={18}
              height={18}
              className="h-8 w-auto"
              src="/logo.png"
              alt="Logo"
            />
          </div>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-1 rounded-full focus:outline-none bg-gray-200 border-red-400 border hover:bg-red-500 hover:text-white cursor-pointer "
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
