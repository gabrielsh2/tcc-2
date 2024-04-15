import { Repository } from 'typeorm';
import { Patient } from '@entities';

export interface PatientRepository extends Repository<Patient> {
  this: Repository<Patient>;
  findByCredentials(email: string, password: string): Promise<Patient>;
  findByNutritionist(nutritionistId: number): Promise<Patient[]>;
}

export const customPatientRepository: Pick<PatientRepository, any> = {
  findByCredentials(
    this: Repository<Patient>,
    email: string,
    password: string,
  ): Promise<Patient> {
    return this.findOne({
      where: {
        email,
        userPassword: password,
      },
    });
  },
  findByNutritionist(
    this: Repository<Patient>,
    nutritionistId: number,
  ): Promise<Patient[]> {
    return this.find({
      where: { nutritionist: { id: nutritionistId } },
    });
  },
};
