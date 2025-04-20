import { IsString, IsOptional, IsEnum } from 'class-validator';
import { AdmissionStatus } from '@prisma/client';

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  gradeLevel: string;

  @IsString()
  previousSchool: string;

  @IsEnum(AdmissionStatus)
  admissionStatus: AdmissionStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
