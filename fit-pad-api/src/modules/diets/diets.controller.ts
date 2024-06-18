import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Diet } from '@entities';
import { CreateDietDto, UpdateDietDto } from './dtos';
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

  @Get('/patient/:patientId')
  async getDietsByPatientId(
    @Param('patientId') patientId: number,
  ): Promise<Diet[]> {
    return this.dietsService.getDietsByPatientId(patientId);
  }

  @Delete('/:dietId')
  async deleteDiet(@Param('dietId') dietId: number) {
    return this.dietsService.deleteDiet(dietId);
  }
}
