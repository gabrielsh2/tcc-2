import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '@enums';

export class UpdateDailyTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
