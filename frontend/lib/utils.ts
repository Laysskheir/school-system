import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAuthenticated = (): boolean => {
  const user = useAuthStore.getState().user;
  return !!user;
};

export const isAdmin = (): boolean => {
  const user = useAuthStore.getState().user;
  return user?.role === "ADMIN";
};

export const handleUnauthorizedError = (error: any): string => {
  if (error.response?.status === 403) {
    return "You don't have permission to perform this action. Only administrators can perform this operation.";
  }
  return error.response?.data?.message || "An error occurred";
};

export const checkAdminAccess = (action: string): boolean => {
  if (!isAdmin()) {
    toast.error(`Only administrators can ${action}`);
    return false;
  }
  return true;
};

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const showErrorToast = (message: string) => {
  toast.error(message);
};
