import { Repository } from 'typeorm';
import { SubstitutionList, Patient } from '@entities';
import { SubstitutionListNotFoundException } from '@exceptions';

export interface SubstitutionListRepository
  extends Repository<SubstitutionList> {
  this: Repository<SubstitutionList>;
  findOneByPatientWithRelations(patient: Patient): Promise<SubstitutionList>;
  findOneByIdWithRelations(
    substitutionListId: number,
  ): Promise<SubstitutionList>;
}

export const customSubstitutionListRepository: Pick<
  SubstitutionListRepository,
  any
> = {
  async findOneByPatientWithRelations(
    this: Repository<SubstitutionList>,
    patient: Patient,
  ) {
    return this.findOneOrFail({
      where: {
        patient,
      },
      relations: {
        foodGroups: {
          items: true,
        },
      },
    }).catch(() => {
      throw new SubstitutionListNotFoundException();
    });
  },
  async findOneByIdWithRelations(
    this: Repository<SubstitutionList>,
    substitutionListId: number,
  ) {
    return this.findOneOrFail({
      where: {
        id: substitutionListId,
      },
      relations: {
        foodGroups: {
          items: true,
        },
      },
    }).catch(() => {
      throw new SubstitutionListNotFoundException();
    });
  },
};
