"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { SidebarNavButton } from "@/components/sidebar-nav-button";
import Logo from "./layouts/logo";
import { navigation } from "@/constants";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r" variant="sidebar" >
      <SidebarHeader className="bg-primary">

        <div className="flex items-center justify-center p-4">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-primary">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarNavButton
                      href={item.href}
                      icon={item.icon}
                      isActive={isActive}
                      name={item.name}
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
