import { Controller, Post, Body, Param } from '@nestjs/common';
import { NutritionistService } from './nutritionist.service';
import { BindPatientDto } from './dto';

@Controller('nutritionist')
export class NutritionistController {
  constructor(private readonly nutritionistsService: NutritionistService) {}

  @Post('/:nutritionistId/bind-patient')
  async bindPatient(
    @Param('nutritionistId') nutritionistId: number,
    @Body() bindPatientDto: BindPatientDto,
  ) {
    return this.nutritionistsService.bindPatient(
      nutritionistId,
      bindPatientDto.patientId,
    );
  }
}
