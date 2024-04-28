import { IsOptional, IsString } from 'class-validator';

export class UpdateDailyNoteDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
