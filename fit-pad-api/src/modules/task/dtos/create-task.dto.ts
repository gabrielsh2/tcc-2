import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
