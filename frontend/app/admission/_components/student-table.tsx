import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDistanceToNowStrict } from "date-fns";

import { toast } from "sonner";
import EditPreviousSchoolDialog from "./edit-school-dialog";
import { Badge } from "@/components/ui/badge";
import { AdmissionStatus, Student } from "@/types";
import { useStudentStore } from "@/store/student-store";
import { ArrowUpDown, Pencil, MoreHorizontal, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isAdmin, isAuthenticated } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteStudentDialog from "./delete-student-dialog";
import EditStudentDialog from "./edit-student-dialog";

interface StudentTableProps {
  students: Student[];
}

const StudentTable = ({ students }: StudentTableProps) => {
  const { updateStudent, deleteStudent } = useStudentStore();
  const [editingSchoolStudent, setEditingSchoolStudent] =
    useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);

  const handleUpdateStatus = async (
    studentId: string,
    status: AdmissionStatus
  ) => {
    if (!isAdmin()) {
      toast.error("Only administrators can update student status");
      return;
    }
    try {
      await updateStudent(studentId, { admissionStatus: status });
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleEditClick = (student: Student) => {
    if (!isAuthenticated()) {
      toast.error("You must be logged in to edit student information");
      return;
    }
    if (!isAdmin()) {
      toast.error("Only administrators can edit student information");
      return;
    }
    setEditingStudent(student);
  };

  const getStatusColor = (status: AdmissionStatus) => {
    switch (status.toUpperCase()) {
      case "SUBMITTED":
        return "bg-gray-100 text-gray-800";
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "ATTENDED":
        return "bg-purple-100 text-purple-800";
      case "RESCHEDULED":
        return "bg-blue-200 text-blue-900";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONTRACT_SENT":
        return "bg-teal-100 text-teal-800";
      case "ENROLLED":
        return "bg-green-200 text-green-900";
      case "PACKAGE_SENT":
        return "bg-indigo-100 text-indigo-800";
      case "VOID":
        return "bg-red-100 text-red-800";
      case "REJECTED":
        return "bg-red-200 text-red-900";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-background overflow-hidden rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/15 hover:bg-secondary/10">
              <TableHead>Student ID </TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Grade Level</TableHead>
              <TableHead>Previous School</TableHead>
              <TableHead>Admission Status</TableHead>
              <TableHead>Last Update</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    {student.id.slice(-6)}
                  </TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.gradeLevel}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span
                            className={`${
                              isAdmin() ? "cursor-pointer hover:underline" : ""
                            }`}
                            onClick={() => handleEditClick(student)}
                          >
                            {student.previousSchool ?? "N/A"}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {isAuthenticated()
                              ? isAdmin()
                                ? "Click to edit previous school"
                                : "Only administrators can edit this information"
                              : "You must be logged in to edit previous school."}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(
                            student.admissionStatus
                          )} border-0 rounded`}
                        >
                          {student.admissionStatus}
                        </Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateStatus(student.id, "Submitted")
                          }
                        >
                          Submitted
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateStatus(student.id, "Approved")
                          }
                        >
                          Approved
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateStatus(student.id, "Pending")
                          }
                        >
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateStatus(student.id, "Rescheduled")
                          }
                        >
                          Rescheduled
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNowStrict(new Date(student.lastUpdate), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="max-w-[70px] truncate">
                    {student.notes || "No notes"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => setEditingStudent(student)}
                        >
                          <div className="flex items-center">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeletingStudent(student)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* Edit Previous School Dialog */}
      <EditPreviousSchoolDialog
        student={editingSchoolStudent}
        isOpen={!!editingSchoolStudent}
        onClose={() => setEditingSchoolStudent(null)}
      />
      {/* Delete student Dialog */}
      <DeleteStudentDialog
        student={deletingStudent}
        isOpen={!!deletingStudent}
        onClose={() => setDeletingStudent(null)}
      />
      {/* Edit student Dialog */}
      <EditStudentDialog
        student={editingStudent}
        isOpen={!!editingStudent}
        onClose={() => setEditingStudent(null)}
      />
    </div>
  );
};

export default StudentTable;
