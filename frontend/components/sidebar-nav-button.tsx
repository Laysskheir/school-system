"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarNavButtonProps {
  href: string;
  icon: LucideIcon;
  isActive: boolean;
  name: string;
  className?: string;
}

export function SidebarNavButton({
  href,
  icon: Icon,
  isActive,
  name,
  className,
}: SidebarNavButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out",
        isActive
          ? "bg-card/20 text-primary-foreground"
          : "text-primary-foreground/80 hover:bg-muted/10 hover:text-primary-foreground",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="font-medium">{name}</span>
    </Link>
  );
}
