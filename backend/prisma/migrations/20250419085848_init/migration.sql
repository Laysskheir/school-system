/*
  Warnings:

  - Changed the type of `admissionStatus` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AdmissionStatus" AS ENUM ('SUBMITTED', 'APPROVED', 'PENDING', 'RESCHEDULED');

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "gradeLevel" SET DATA TYPE TEXT,
DROP COLUMN "admissionStatus",
ADD COLUMN     "admissionStatus" "AdmissionStatus" NOT NULL;
