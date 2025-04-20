import { AdmissionStatus } from '@prisma/client';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  gradeLevel?: number;

  @IsOptional()
  @IsString()
  previousSchool?: string;

  @IsOptional()
  @IsEnum(AdmissionStatus)
  admissionStatus?: AdmissionStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
