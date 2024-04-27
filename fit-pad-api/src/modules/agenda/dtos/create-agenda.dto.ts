import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAgendaDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
