import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda, DailyTask, Patient, Task } from '@entities';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda, Patient, DailyTask, Task])],
  providers: [AgendaService],
  controllers: [AgendaController],
})
export class AgendaModule {}
