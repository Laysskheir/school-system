"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { File, LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigation } from "@/constants";
import { useAuthStore } from "@/store/auth-store";
import { AuthDialog } from "@/components/auth/auth-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "../ui/sidebar";

export function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex items-center justify-between px-4 py-2">

      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <div className="bg-secondary/10 p-1.5 rounded-sm">
          <File className="w-4 h-4 text-secondary" />
        </div>
        <nav className="flex space-x-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              isActive && (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-2xl font-bold"
                >
                  {item.name}
                </a>
              )
            );
          })}
        </nav>
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold text-orange-400">TRACK: {currentYear}-{currentYear + 1}</span>
        </div>

      </div>

      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => logout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <AuthDialog />
        )}
      </div>
    </div>
  );
}
