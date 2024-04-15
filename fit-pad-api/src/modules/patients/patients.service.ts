import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '@entities';
import { PatientRepository } from '@repositories';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientsRepository: PatientRepository,
  ) {}

  async findAll(): Promise<Patient[]> {
    return this.patientsRepository.find();
  }

  async findAllByNutritionistId(nutritionistId: number): Promise<Patient[]> {
    return this.patientsRepository.findByNutritionist(nutritionistId);
  }
}
