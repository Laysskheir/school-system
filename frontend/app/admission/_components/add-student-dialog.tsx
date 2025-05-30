import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStudentStore } from "@/store/student-store";
import { Label } from "@/components/ui/label";
import { AdmissionStatus } from "@/types";

interface Props {
  children: React.ReactNode;
}

const admissionStatuses: AdmissionStatus[] = [
  "Submitted",
  "Scheduled",
  "Approved",
  "Attended",
  "Rescheduled",
  "Pending",
  "ContractSent",
  "Enrolled",
  "PackageSent",
  "Void",
  "Rejected",
];

export default function AddStudentDialog({ children }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gradeLevel, setGradeLevel] = useState<number>(0);
  const [previousSchool, setPreviousSchool] = useState("");
  const [admissionStatus, setAdmissionStatus] =
    useState<AdmissionStatus>("Submitted");
  const [notes, setNotes] = useState("");
  const { addStudent } = useStudentStore();

  const handleSubmit = async () => {
    await addStudent({
      firstName,
      lastName,
      gradeLevel: gradeLevel,
      previousSchool,
      admissionStatus,
      notes,
    });
    setFirstName("");
    setLastName("");
    setGradeLevel(0);
    setPreviousSchool("");
    setAdmissionStatus("Submitted");
    setNotes("");
  };

  const isFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      gradeLevel > 0 &&
      previousSchool.trim() !== "" &&
      admissionStatuses.includes(admissionStatus)
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <div>
        <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden">
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <form className="space-y-2">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label>First Name</Label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Last Name</Label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <Label>Grade Level</Label>
                <Input
                  type="number"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(Number(e.target.value))}
                  placeholder="Enter grade level"
                  required
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>Previous School</Label>
                <Input
                  value={previousSchool}
                  onChange={(e) => setPreviousSchool(e.target.value)}
                  placeholder="Enter previous school"
                  required
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>Admission Status</Label>
                <Select
                  onValueChange={(value: string) =>
                    setAdmissionStatus(value as AdmissionStatus)
                  }
                  defaultValue={admissionStatus}
                >
                  <SelectTrigger className="w-full bg-muted shadow-none">
                    <SelectValue placeholder="Select Admission Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {admissionStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <Label>Notes</Label>
                <Input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter any notes"
                  required
                />
              </div>
            </form>

            <DialogFooter className="border-t pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid()}
              >
                Add Student
              </Button>
            </DialogFooter>
          </DialogContent>
        </div>
      </div>
    </Dialog>
  );
}
