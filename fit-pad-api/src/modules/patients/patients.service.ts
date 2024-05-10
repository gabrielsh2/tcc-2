import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull } from 'typeorm';
import { Patient } from '@entities';
import { PatientRepository } from '@repositories';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientsRepository: PatientRepository,
  ) {}

  async findAllByNutritionistId(nutritionistId: number): Promise<Patient[]> {
    return this.patientsRepository.findByNutritionist(nutritionistId);
  }

  async findAllAvailable(): Promise<Patient[]> {
    return this.patientsRepository.find({
      where: {
        nutritionist: IsNull(),
      },
    });
  }
}
