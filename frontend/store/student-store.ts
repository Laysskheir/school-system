import { create } from "zustand";
import axios from "axios";
import { StatusCount, Student } from "@/types";
import {
  handleUnauthorizedError,
  checkAdminAccess,
  showSuccessToast,
  showErrorToast,
  isAuthenticated,
} from "@/lib/utils";
import { api } from "@/lib/api";

interface StudentState {
  students: Student[];
  filteredStudents: Student[];
  statusCounts: StatusCount[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  totalStudents: number;

  // Pagination
  currentPage: number;
  totalPages: number;
  perPage: number;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;

  // Actions
  fetchStudents: () => Promise<void>;
  fetchStatusCounts: () => Promise<void>;
  addStudent: (
    student: Omit<Student, "id" | "lastUpdate" | "studentId">
  ) => Promise<void>;
  updateStudent: (id: string, data: Partial<Student>) => Promise<void>;
  updatePreviousSchool: (id: string, previousSchool: string) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;

  // Filters
  setSearchTerm: (term: string) => void;
  applyFilters: () => void;
}

const API_URL = "http://localhost:5000";

export const useStudentStore = create<StudentState>()((set, get) => ({
  students: [],
  filteredStudents: [],
  statusCounts: [],
  isLoading: false,
  error: null,
  searchTerm: "",
  totalStudents: 0,
  currentPage: 1,
  totalPages: 1,
  perPage: 10,

  setPage: (page: number) => set({ currentPage: page }),

  setPerPage: (perPage: number) => {
    set({ perPage, currentPage: 1 });
    get().fetchStudents();
  },

  fetchStudents: async () => {
    const { currentPage, perPage } = get();
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/students`, {
        params: { page: currentPage, limit: perPage },
      });

      const { data, totalPages, total } = response.data;

      set({
        students: data,
        filteredStudents: data,
        totalPages,
        totalStudents: total || 0,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch students",
        isLoading: false,
      });
    }
  },

  fetchStatusCounts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/students/admission-stats`);
      set({ statusCounts: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch admission stats",
        isLoading: false,
      });
    }
  },

  addStudent: async (
    student: Omit<Student, "id" | "lastUpdate" | "studentId">
  ) => {
    if (!isAuthenticated()) {
      showErrorToast("You should login first");
      return;
    }
    if (!checkAdminAccess("add new students")) {
      showErrorToast("Only admins can add new students");
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`${API_URL}/students`, student);
      const { students } = get();
      set({
        students: [...students, response.data],
        isLoading: false,
      });
      showSuccessToast("Student added successfully");
      // Re-apply filters
      get().applyFilters();
      // Refresh stats
      get().fetchStatusCounts();
    } catch (error: any) {
      const errorMessage = handleUnauthorizedError(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      showErrorToast(errorMessage);
    }
  },

  updateStudent: async (id, data) => {
    if (!isAuthenticated()) {
      showErrorToast("You should login first");
      return;
    }
    if (!checkAdminAccess("add new students")) {
      showErrorToast("Only admins can update student information");
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await api.patch(`${API_URL}/students/${id}`, data);
      const { students } = get();
      const updatedStudents = students.map((student) =>
        student.id === id ? { ...student, ...response.data } : student
      );
      set({
        students: updatedStudents,
        isLoading: false,
      });
      showSuccessToast("Student updated successfully");
      // Re-apply filters
      get().applyFilters();
      // Refresh stats if status was updated
      if (data.admissionStatus) {
        get().fetchStatusCounts();
      }
    } catch (error: any) {
      const errorMessage = handleUnauthorizedError(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      showErrorToast(errorMessage);
    }
  },

  updatePreviousSchool: async (id, previousSchool) => {
    if (!checkAdminAccess("update previous school information")) return;

    set({ isLoading: true, error: null });
    try {
      await api.patch(`${API_URL}/students/${id}/previous-school`, {
        previousSchool,
      });
      const { students, filteredStudents } = get();
      const studentToUpdate = students.find((s) => s.id === id);
      if (!studentToUpdate) {
        throw new Error("Student not found");
      }

      const updatedStudent: Student = {
        ...studentToUpdate,
        previousSchool,
      };

      const updatedStudents = students.map((student) =>
        student.id === id ? updatedStudent : student
      );

      const updatedFilteredStudents = filteredStudents.map((student) =>
        student.id === id ? updatedStudent : student
      );

      set({
        students: updatedStudents,
        filteredStudents: updatedFilteredStudents,
        isLoading: false,
      });
      showSuccessToast("Previous school updated successfully");
    } catch (error: any) {
      const errorMessage = handleUnauthorizedError(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      showErrorToast(errorMessage);
    }
  },

  deleteStudent: async (id) => {
    // Check if the user is authenticated
    if (!isAuthenticated()) {
      showErrorToast("You should login first");
      return;
    }

    // Check if the user has admin access
    if (!checkAdminAccess("delete students")) {
      showErrorToast("Only admins can delete students");
      return;
    }

    set({ isLoading: true, error: null });
    try {
      await api.delete(`${API_URL}/students/${id}`);
      const { students } = get();
      const updatedStudents = students.filter((student) => student.id !== id);
      set({
        students: updatedStudents,
        isLoading: false,
      });
      showSuccessToast("Student deleted successfully");
      // Re-apply filters
      get().applyFilters();
      // Refresh stats
      get().fetchStatusCounts();
    } catch (error: any) {
      const errorMessage = handleUnauthorizedError(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      showErrorToast(errorMessage);
    }
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term, currentPage: 1 });
  },

  applyFilters: () => {
    const { students, searchTerm } = get();

    let filtered = [...students];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((student) => {
        const studentId = student.studentId?.toLowerCase() || "";
        const firstName = student.firstName?.toLowerCase() || "";
        const lastName = student.lastName?.toLowerCase() || "";
        return (
          studentId.includes(term) ||
          firstName.includes(term) ||
          lastName.includes(term)
        );
      });
    }

    // Calculate new total pages based on filtered results
    const totalPages = Math.ceil(filtered.length / get().perPage);

    set({
      filteredStudents: filtered,
      totalPages,
      // If current page is greater than new total pages, reset to first page
      currentPage: get().currentPage > totalPages ? 1 : get().currentPage,
    });
  },
}));
