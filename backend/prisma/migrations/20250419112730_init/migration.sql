/*
  Warnings:

  - The values [SUBMITTED,APPROVED,PENDING,RESCHEDULED] on the enum `AdmissionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AdmissionStatus_new" AS ENUM ('Submitted', 'Scheduled', 'Approved', 'Attended', 'Rescheduled', 'Pending', 'ContractSent', 'Enrolled', 'PackageSent', 'Void', 'Rejected');
ALTER TABLE "Student" ALTER COLUMN "admissionStatus" TYPE "AdmissionStatus_new" USING ("admissionStatus"::text::"AdmissionStatus_new");
ALTER TYPE "AdmissionStatus" RENAME TO "AdmissionStatus_old";
ALTER TYPE "AdmissionStatus_new" RENAME TO "AdmissionStatus";
DROP TYPE "AdmissionStatus_old";
COMMIT;
