import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import {
  CreateAgendaDto,
  CreateAgendaResponseDto,
  CreateDailyTaskDto,
  RegisterMoodEmojiDto,
  UpdateDailyTaskDto,
} from './dtos';

@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post('/patient/:patientId')
  async createAgenda(
    @Param('patientId') patientId: number,
    @Body() createAgendaDto: CreateAgendaDto,
  ): Promise<CreateAgendaResponseDto> {
    return this.agendaService.createAgenda(patientId, createAgendaDto);
  }

  @Put('/:agendaId/register-mood-emoji')
  async registerMoodEmoji(
    @Param('agendaId') agendaId: number,
    @Body() registerMoodEmojiDto: RegisterMoodEmojiDto,
  ): Promise<void> {
    return this.agendaService.registerMoodEmoji(agendaId, registerMoodEmojiDto);
  }

  @Post('/:agendaId/register-daily-task/:taskId')
  async registerDailyTask(
    @Param('agendaId') agendaId: number,
    @Param('taskId') taskId: number,
    @Body() createDailyTaskDto: CreateDailyTaskDto,
  ): Promise<void> {
    return this.agendaService.createDailyTask(
      agendaId,
      taskId,
      createDailyTaskDto,
    );
  }

  @Put('/daily-task/:dailyTaskId')
  async updateDailyTask(
    @Param('dailyTaskId') dailyTaskId: number,
    @Body() updateDailyTaskDto: UpdateDailyTaskDto,
  ): Promise<void> {
    return this.agendaService.updateDailyTask(dailyTaskId, updateDailyTaskDto);
  }
}
