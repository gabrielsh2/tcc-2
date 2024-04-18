import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dtos';
import { TaskService } from './task.service';
import { Task } from '@entities';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/patient/:patientId')
  async create(
    @Param('patientId') patientId: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(patientId, createTaskDto);
  }

  @Put('/:taskId')
  async update(
    @Param('taskId') taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(taskId, updateTaskDto);
  }

  @Delete(':taskId')
  async delete(@Param('taskId') taskId: number) {
    await this.taskService.delete(taskId);
  }

  @Get('patient/:patientId')
  async findAllByPatient(
    @Param('patientId') patientId: number,
  ): Promise<Task[]> {
    return this.taskService.findAllByPatient(patientId);
  }
}
