"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {Loader, Plus, SearchIcon } from "lucide-react";
import { useStudentStore } from "@/store/student-store";
import StudentTable from "@/app/admission/_components/student-table";
import { useEffect, useState } from "react";
import StudentPagination from "./_components/student-pagination";
import AddStudentDialog from "./_components/add-student-dialog";
import { Student } from "@/types";

export default function AdmissionPage() {
  const [addingStudent, setAddingStudent] = useState<Student | null>(null);
  const {
    fetchStudents,
    filteredStudents,
    isLoading,
    error,
    currentPage,
    totalPages,
    setPage,
    totalStudents,
    setSearchTerm,
    applyFilters,
  } = useStudentStore();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents, currentPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value); // Update local state
    setSearchTerm(value); // Update store
    applyFilters(); // Call applyFilters to update the filtered students
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="new">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="space-y-1 w-full">
            <TabsList className="bg-accent/10 ">
              <TabsTrigger value="new">New applicants</TabsTrigger>
              <TabsTrigger value="returning">Returning families</TabsTrigger>
            </TabsList>
            <div className="relative mx-1 ">
              <Separator className="w-screen -my-1" />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full py-2 bg-accent/10 rounded-md">
              <div className="pl-1 pt-4 font-semibold text-lg">
                All Students
                <Badge className="ml-4 p-2 bg-secondary/10 text-secondary hover:bg-primary/20 hover:text-secondary">
                  Total: {totalStudents}
                </Badge>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
             
                <div className="relative w-full">
                  <Input
                    className="peer ps-9 pe-9 w-full"
                    type="search"
                    placeholder="Search students..."
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                    <SearchIcon className="w-4 h-4" />
                  </div>
                </div>
                <AddStudentDialog>
                  <Button>
                    <Plus className="w-4 h-4" />
                    Add Student
                  </Button>
                </AddStudentDialog>
              </div>
            </div>
          </div>
        </div>
        <TabsContent value="new">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <StudentTable students={filteredStudents} />
          )}
          {/* Pagination */}
          <StudentPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setPage(page)}
            isLoading={isLoading}
            setPage={setPage}
          />
        </TabsContent>
        <TabsContent value="returning" className="mt-0">
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <p className="text-muted-foreground">
              Returning families data will be displayed here
            </p>
            <Button variant="outline" size="sm">
              Import returning families
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
