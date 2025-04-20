import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

const API_URL = "http://localhost:5000";

// Create axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    // Get token from zustand store
    const token = useAuthStore.getState().token;

    // If token exists, add it to the headers
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the error is due to authentication (401), log the user out
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().logout();
      // You could also redirect to login page here if needed
    }
    return Promise.reject(error);
  }
);
