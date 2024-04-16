import { IsOptional, IsString } from 'class-validator';

export class UpdateMedicalPrescriptionDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
