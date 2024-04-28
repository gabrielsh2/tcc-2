import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DailyNote } from '@entities';
import { DailyNoteService } from './daily-note.service';
import { CreateDailyNoteDto, UpdateDailyNoteDto } from './dtos';

@Controller('daily-note')
export class DailyNoteController {
  constructor(public dailyNoteService: DailyNoteService) {}

  @Post('/agenda/:agendaId')
  async create(
    @Param('agendaId') agendaId: number,
    @Body() createDailyNoteDto: CreateDailyNoteDto,
  ): Promise<void> {
    return this.dailyNoteService.create(agendaId, createDailyNoteDto);
  }

  @Put('/:dailyNoteId')
  async update(
    @Param('dailyNoteId') dailyNoteId: number,
    @Body() updateDailyNoteDto: UpdateDailyNoteDto,
  ): Promise<void> {
    return this.dailyNoteService.update(dailyNoteId, updateDailyNoteDto);
  }

  @Delete('/:dailyNoteId')
  async delete(@Param('dailyNoteId') dailyNoteId: number): Promise<void> {
    return this.dailyNoteService.delete(dailyNoteId);
  }

  @Get('/agenda/:agendaId')
  async findByAgenda(
    @Param('agendaId') agendaId: number,
  ): Promise<DailyNote[]> {
    return this.dailyNoteService.findByAgenda(agendaId);
  }
}
