import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient, Task } from '@entities';
import { PatientNotFoundException, TaskNotFoundException } from '@exceptions';
import { CreateTaskDto, UpdateTaskDto } from './dtos';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(patientId: number, createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const patient = await this.patientRepository
      .findOneByOrFail({ id: patientId })
      .catch(() => {
        throw new PatientNotFoundException();
      });

    const task = new Task(title, description, patient);

    await this.taskRepository.save(task);
  }

  async update(taskId: number, updateTaskDto: UpdateTaskDto): Promise<void> {
    const { description, title } = updateTaskDto;

    const task = await this.taskRepository
      .findOneByOrFail({ id: taskId })
      .catch(() => {
        throw new TaskNotFoundException();
      });

    task.title = title;
    task.description = description;

    await this.taskRepository.save(task);
  }

  async delete(taskId: number): Promise<void> {
    const task = await this.taskRepository
      .findOneByOrFail({ id: taskId })
      .catch(() => {
        throw new TaskNotFoundException();
      });

    await this.taskRepository.remove(task);
  }

  async findAllByPatient(patientId: number): Promise<Task[]> {
    const patient = await this.patientRepository
      .findOneByOrFail({ id: patientId })
      .catch(() => {
        throw new PatientNotFoundException();
      });

    return this.taskRepository.find({ where: { patient } });
  }
}
