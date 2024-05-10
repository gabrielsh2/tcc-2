import { Controller, Get, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientDto } from './dtos';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get('/nutritionist/:nutritionistId')
  async findAllByNutritionistId(
    @Param('nutritionistId') nutritionistId: number,
  ): Promise<PatientDto[]> {
    return this.patientsService.findAllByNutritionistId(nutritionistId);
  }

  @Get('/available')
  async findAllAvailable(): Promise<PatientDto[]> {
    return this.patientsService.findAllAvailable();
  }
}
