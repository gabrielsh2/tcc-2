import { Repository } from 'typeorm';
import { Nutritionist, Patient } from '@entities';
import { NotFoundException } from '@nestjs/common';

export interface NutritionistRepository extends Repository<Nutritionist> {
  this: Repository<Nutritionist>;
  findByCredentials(email: string, password: string): Promise<Nutritionist>;
  savePatient(nutritionistId: number, patient: Patient): Promise<void>;
}

export const customNutritionistRepository: Pick<NutritionistRepository, any> = {
  findByCredentials(
    this: Repository<Nutritionist>,
    email: string,
    password: string,
  ) {
    return this.findOne({
      where: {
        email,
        userPassword: password,
      },
    });
  },
  async savePatient(
    this: Repository<Nutritionist>,
    nutritionistId: number,
    patient: Patient,
  ) {
    const nutritionist = await this.findOneOrFail({
      where: {
        id: nutritionistId,
      },
      relations: {
        patients: true,
      },
    }).catch(() => {
      throw new NotFoundException('Nutricionista não encontrado!');
    });

    nutritionist.patients.push(patient);
    this.save(nutritionist);
  },
};
