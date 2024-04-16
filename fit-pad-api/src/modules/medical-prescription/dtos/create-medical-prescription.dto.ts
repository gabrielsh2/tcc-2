import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateMedicalPrescriptionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
