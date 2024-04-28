import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda, DailyNote } from '@entities';
import { DailyNoteController } from './daily-note.controller';
import { DailyNoteService } from './daily-note.service';

@Module({
  imports: [TypeOrmModule.forFeature([DailyNote, Agenda])],
  controllers: [DailyNoteController],
  providers: [DailyNoteService],
})
export class DailyNoteModule {}
