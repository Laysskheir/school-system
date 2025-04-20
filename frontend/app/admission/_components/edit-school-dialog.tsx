"use client";

import { useId, useState, useEffect } from "react";
import { useStudentStore } from "@/store/student-store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Student } from "@/types";
import { School } from "lucide-react";
import { isAdmin } from "@/lib/utils";

interface Props {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditPreviousSchoolDialog({
  student,
  isOpen,
  onClose,
}: Props) {
  const { updatePreviousSchool } = useStudentStore();
  const [previousSchool, setPreviousSchool] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const id = useId();

  // Update the input value when the student changes
  useEffect(() => {
    if (student) {
      setPreviousSchool(student.previousSchool || "");
    }
  }, [student]);

  const handleSubmit = async () => {
    if (!student) return;

    setIsSubmitting(true);
    try {
      await updatePreviousSchool(student.id, previousSchool);
      toast.success(
        "Previous school information has been updated successfully"
      );
      onClose();
    } catch (error) {
      toast.error("Could not update previous school. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <School className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Edit Previous School
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              Update the previous school information for{" "}
              <span className="text-foreground">
                {student?.firstName} {student?.lastName}
              </span>
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="*:not-first:mt-2">
            <Label htmlFor={id}>School Name</Label>
            <Input
              id={id}
              type="text"
              placeholder="Enter previous school name"
              value={previousSchool}
              onChange={(e) => setPreviousSchool(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
