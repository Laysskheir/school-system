import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';
import { AdmissionStatus } from '@prisma/client';

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  gradeLevel: number;

  @IsString()
  previousSchool: string;

  @IsEnum(AdmissionStatus)
  admissionStatus: AdmissionStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
