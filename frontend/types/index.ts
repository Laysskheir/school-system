export type AdmissionStatus =
  | "Submitted"
  | "Scheduled"
  | "Approved"
  | "Attended"
  | "Rescheduled"
  | "Pending"
  | "ContractSent"
  | "Enrolled"
  | "PackageSent"
  | "Void"
  | "Rejected";

export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  gradeLevel: string;
  previousSchool: string | null;
  admissionStatus: AdmissionStatus;
  lastUpdate: string;
  notes: string | null;
}

export interface StatusCount {
  status: AdmissionStatus;
  count: number;
}
