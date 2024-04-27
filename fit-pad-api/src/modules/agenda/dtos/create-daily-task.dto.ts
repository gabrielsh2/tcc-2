import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '@enums';

export class CreateDailyTaskDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
