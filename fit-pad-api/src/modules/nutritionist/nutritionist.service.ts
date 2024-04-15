import { Nutritionist, Patient } from '@entities';
import { PatientNotFoundException } from '@exceptions';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NutritionistRepository } from '@repositories';
import { Repository } from 'typeorm';

@Injectable()
export class NutritionistService {
  constructor(
    @InjectRepository(Nutritionist)
    private readonly nutritionistRepository: NutritionistRepository,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async bindPatient(nutritionistId: number, patientId: number): Promise<void> {
    const patient = await this.patientRepository
      .findOneByOrFail({
        id: patientId,
      })
      .catch(() => {
        throw new PatientNotFoundException();
      });

    await this.nutritionistRepository.savePatient(nutritionistId, patient);
  }
}
