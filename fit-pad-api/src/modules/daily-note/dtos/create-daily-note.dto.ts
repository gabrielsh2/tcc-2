import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDailyNoteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
