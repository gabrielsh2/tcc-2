import { Repository } from 'typeorm';
import { Diet, Patient } from '@entities';
import { DietNotFoundException } from '@exceptions';

export interface DietRepository extends Repository<Diet> {
  this: Repository<Diet>;
  findWithMealRelations(dietId: number): Promise<Diet>;
  findByPatient(patient: Patient): Promise<Diet[]>;
}

export const customDietRepository: Pick<DietRepository, any> = {
  async findWithMealRelations(this: Repository<Diet>, dietId: number) {
    return this.findOneOrFail({
      where: {
        id: dietId,
      },
      relations: {
        meals: {
          mealItems: true,
        },
      },
    }).catch(() => {
      throw new DietNotFoundException();
    });
  },
  async findByPatient(this: Repository<Diet>, patient: Patient) {
    return this.find({
      where: {
        patient,
      },
      relations: {
        meals: {
          mealItems: true,
        },
      },
    });
  },
};
