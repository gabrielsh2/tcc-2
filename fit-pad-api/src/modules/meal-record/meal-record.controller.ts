import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MealRecord } from '@entities';
import { MealRecordService } from './meal-record.service';
import { CreateMealRecordDto, UpdateMealRecordDto } from './dtos';

@Controller('meal-record')
export class MealRecordController {
  constructor(private readonly mealRecordService: MealRecordService) {}

  @Post('/agenda/:agendaId')
  async create(
    @Param('agendaId') agendaId: number,
    @Body() createMealRecordDto: CreateMealRecordDto,
  ): Promise<void> {
    await this.mealRecordService.create(agendaId, createMealRecordDto);
  }

  @Put('/:mealRecordId')
  async update(
    @Param('mealRecordId') mealRecordId: number,
    @Body() updateMealRecordDto: UpdateMealRecordDto,
  ): Promise<void> {
    await this.mealRecordService.update(mealRecordId, updateMealRecordDto);
  }

  @Delete('/:mealRecordId')
  async delete(@Param('mealRecordId') mealRecordId: number): Promise<void> {
    await this.mealRecordService.delete(mealRecordId);
  }

  @Get('/agenda/:agendaId')
  async findByAgenda(
    @Param('agendaId') agendaId: number,
  ): Promise<MealRecord[]> {
    return this.mealRecordService.findByAgenda(agendaId);
  }
}
