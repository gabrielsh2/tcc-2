import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda, MealRecord, MealRecordItem } from '@entities';
import { MealRecordController } from './meal-record.controller';
import { MealRecordService } from './meal-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda, MealRecord, MealRecordItem])],
  controllers: [MealRecordController],
  providers: [MealRecordService],
})
export class MealRecordModule {}
