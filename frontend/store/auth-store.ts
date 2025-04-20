// src/store/auth-store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

// Use hardcoded API URL
const API_URL = "http://localhost:5000";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
          });

          const { access_token, user } = response.data;

          set({
            token: access_token,
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          // Set the default Authorization header for future requests
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${access_token}`;
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message || "An error occurred during login",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        // Remove the Authorization header
        delete axios.defaults.headers.common["Authorization"];

        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },

      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/signup`, {
            email,
            password,
            name,
          });

          const { access_token, user } = response.data;

          set({
            token: access_token,
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          // Set the default Authorization header for future requests
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${access_token}`;
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message ||
              "An error occurred during signup",
            isLoading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
