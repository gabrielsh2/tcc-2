import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agenda, DailyNote } from '@entities';
import {
  AgendaNotFoundException,
  DailyNoteNotFoundException,
} from '@exceptions';
import { CreateDailyNoteDto, UpdateDailyNoteDto } from './dtos';

@Injectable()
export class DailyNoteService {
  constructor(
    @InjectRepository(DailyNote)
    private dailyNoteRepository: Repository<DailyNote>,
    @InjectRepository(Agenda)
    private agendaRepository: Repository<Agenda>,
  ) {}

  async create(agendaId: number, createDailyNoteDto: CreateDailyNoteDto) {
    const { description, title } = createDailyNoteDto;

    const agenda = await this.agendaRepository
      .findOneByOrFail({ id: agendaId })
      .catch(() => {
        throw new AgendaNotFoundException();
      });

    const dailyNote = new DailyNote(title, description, agenda);

    await this.dailyNoteRepository.save(dailyNote);
  }

  async update(
    dailyNoteId: number,
    updateDailyNoteDto: UpdateDailyNoteDto,
  ): Promise<void> {
    const { description, title } = updateDailyNoteDto;

    const dailyNote = await this.dailyNoteRepository
      .findOneByOrFail({
        id: dailyNoteId,
      })
      .catch(() => {
        throw new DailyNoteNotFoundException();
      });

    dailyNote.title = title;
    dailyNote.description = description;

    await this.dailyNoteRepository.save(dailyNote);
  }

  async delete(dailyNoteId: number): Promise<void> {
    const dailyNote = await this.dailyNoteRepository
      .findOneByOrFail({
        id: dailyNoteId,
      })
      .catch(() => {
        throw new DailyNoteNotFoundException();
      });

    await this.dailyNoteRepository.remove(dailyNote);
  }

  async findByAgenda(agendaId: number): Promise<DailyNote[]> {
    const agenda = await this.agendaRepository
      .findOneByOrFail({ id: agendaId })
      .catch(() => {
        throw new AgendaNotFoundException();
      });

    return this.dailyNoteRepository.findBy({
      agenda,
    });
  }
}
