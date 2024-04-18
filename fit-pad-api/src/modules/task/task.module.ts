import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient, Task } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Patient])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
