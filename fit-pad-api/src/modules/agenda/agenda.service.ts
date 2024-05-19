import { Between, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { startOfMonth, endOfMonth } from 'date-fns';
import { Agenda, DailyTask, Patient, Task } from '@entities';
import {
  AgendaNotFoundException,
  DailyTaskNotFoundException,
  PatientNotFoundException,
  TaskNotFoundException,
} from '@exceptions';
import {
  CreateAgendaDto,
  CreateAgendaResponseDto,
  CreateDailyTaskDto,
  RegisterMoodEmojiDto,
  UpdateDailyTaskDto,
} from './dtos';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(DailyTask)
    private readonly dailyTaskRepository: Repository<DailyTask>,
  ) {}

  async createAgenda(
    patientId: number,
    createAgendaDto: CreateAgendaDto,
  ): Promise<CreateAgendaResponseDto> {
    const { date } = createAgendaDto;

    const patient = await this.patientRepository
      .findOneByOrFail({
        id: patientId,
      })
      .catch(() => {
        throw new PatientNotFoundException();
      });

    const agenda = await this.agendaRepository.save({
      registerDate: date,
      patient,
    });

    const createAgendaResponseDto = new CreateAgendaResponseDto(agenda.id);

    return createAgendaResponseDto;
  }

  async registerMoodEmoji(
    agendaId: number,
    registerMoodEmojiDto: RegisterMoodEmojiDto,
  ) {
    const { moodEmoji } = registerMoodEmojiDto;

    const agenda = await this.agendaRepository
      .findOneByOrFail({
        id: agendaId,
      })
      .catch(() => {
        throw new AgendaNotFoundException();
      });

    agenda.moodEmoji = moodEmoji;

    await this.agendaRepository.save(agenda);
  }

  async createDailyTask(
    agendaId: number,
    taskId: number,
    createDailyTaskDto: CreateDailyTaskDto,
  ) {
    const { status } = createDailyTaskDto;

    const agenda = await this.agendaRepository
      .findOneOrFail({
        where: { id: agendaId },
        relations: { patient: true },
      })
      .catch(() => {
        throw new AgendaNotFoundException();
      });

    const task = await this.taskRepository
      .findOneOrFail({
        where: { id: taskId, patient: agenda.patient },
        relations: {
          patient: true,
        },
      })
      .catch(() => {
        throw new TaskNotFoundException();
      });

    const dailyTask = new DailyTask(status, agenda, task);

    await this.dailyTaskRepository.save(dailyTask);
  }

  async updateDailyTask(
    dailyTaskId: number,
    updateDailyTaskDto: UpdateDailyTaskDto,
  ) {
    const { status } = updateDailyTaskDto;

    const dailyTask = await this.dailyTaskRepository
      .findOneByOrFail({
        id: dailyTaskId,
      })
      .catch(() => {
        throw new DailyTaskNotFoundException();
      });

    dailyTask.status = status;

    await this.dailyTaskRepository.save(dailyTask);
  }

  async findDailyTasks(agendaId: number): Promise<DailyTask[]> {
    const agenda = await this.agendaRepository
      .findOneOrFail({
        where: { id: agendaId },
        relations: { patient: true },
      })
      .catch(() => {
        throw new AgendaNotFoundException();
      });

    return this.dailyTaskRepository.find({
      where: {
        agenda,
      },
      relations: {
        task: true,
      },
    });
  }

  async findAgendasByMonth(patientId: number): Promise<Agenda[]> {
    const patient = await this.patientRepository
      .findOneByOrFail({
        id: patientId,
      })
      .catch(() => {
        throw new PatientNotFoundException();
      });

    return this.agendaRepository.find({
      where: {
        patient,
      },
    });
  }
}
