import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateDietDto, UpdateDietDto } from './dto';
import { DietsService } from './diets.service';

@Controller('diets')
export class DietsController {
  constructor(private readonly dietsService: DietsService) {}

  @Post('/patient/:patientId')
  async createDiet(
    @Param('patientId') patientId: number,
    @Body() createDietDto: CreateDietDto,
  ) {
    return this.dietsService.createDiet(patientId, createDietDto);
  }

  @Put('/:dietId')
  async updateDiet(
    @Param('dietId') dietId: number,
    @Body() updateDietDto: UpdateDietDto,
  ) {
    return this.dietsService.updateDiet(dietId, updateDietDto);
  }
}
