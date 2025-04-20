// src/students/dto/update-school.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePreviousSchoolDto {
  @IsString()
  @IsNotEmpty()
  previousSchool: string;
}
