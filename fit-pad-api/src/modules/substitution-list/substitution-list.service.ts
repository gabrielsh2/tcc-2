import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodGroup, FoodGroupItem, Patient, SubstitutionList } from '@entities';
import {
  DuplicatedSubstitutionListException,
  PatientNotFoundException,
} from '@exceptions';
import { SubstitutionListRepository } from '@repositories';
import {
  FoodGroupDto,
  CreateSubstitutionListDto,
  UpdateSubstitutionListDto,
} from './dtos';

@Injectable()
export class SubstitutionListService {
  constructor(
    @InjectRepository(SubstitutionList)
    private readonly substitutionListRepository: SubstitutionListRepository,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(FoodGroup)
    private readonly foodGroupRepository: Repository<FoodGroup>,
    @InjectRepository(FoodGroupItem)
    private readonly foodGroupItemRepository: Repository<FoodGroupItem>,
  ) {}

  private getFoodGroupItems(foodGroups: FoodGroup[]): FoodGroupItem[] {
    return foodGroups.reduce((currentFoodGroupItems, foodGroup) => {
      const { items } = foodGroup;
      items.forEach((mealItem) => {
        mealItem.foodGroup = foodGroup;
      });

      return [...currentFoodGroupItems, ...items];
    }, []);
  }

  private async removeFoodGroupItems(meals: FoodGroup[]): Promise<void> {
    const mealItems = this.getFoodGroupItems(meals);

    await this.foodGroupItemRepository.remove(mealItems);
  }

  private async insertFoodGroupItems(foodGroups: FoodGroup[]) {
    const foodGroupItems = this.getFoodGroupItems(foodGroups);

    await this.foodGroupItemRepository.insert(foodGroupItems);
  }

  private async insertFoodGroups(
    foodGroups: FoodGroup[],
    substitutionList: SubstitutionList,
  ) {
    foodGroups.forEach((foodGroup) => {
      foodGroup.substitutionList = substitutionList;
    });

    await this.foodGroupRepository.insert(foodGroups);
  }

  private mapFoodGroups(foodGroups: FoodGroupDto[]): FoodGroup[] {
    return foodGroups?.map(({ items, name }) => {
      const foodGroupItems = items?.map(
        ({ name, quantity }) => new FoodGroupItem(name, quantity),
      );

      return new FoodGroup(name, foodGroupItems);
    });
  }

  private async patientHasSubstitutionList(patient: Patient): Promise<boolean> {
    const substitutionList = await this.substitutionListRepository.findOne({
      where: {
        patient,
      },
    });

    return !!substitutionList;
  }

  async createSubstitutionList(
    patientId: number,
    createSubstitutionListDto: CreateSubstitutionListDto,
  ): Promise<void> {
    const { foodGroups, observations } = createSubstitutionListDto;

    const patient = await this.patientRepository
      .findOneByOrFail({
        id: patientId,
      })
      .catch(() => {
        throw new PatientNotFoundException();
      });

    if (await this.patientHasSubstitutionList(patient)) {
      throw new DuplicatedSubstitutionListException();
    }

    const mappedFoodGroups = this.mapFoodGroups(foodGroups);

    const substitutionList = new SubstitutionList(
      observations,
      patient,
      mappedFoodGroups,
    );
    await this.substitutionListRepository.save(substitutionList);

    await this.insertFoodGroups(mappedFoodGroups, substitutionList);
    await this.insertFoodGroupItems(mappedFoodGroups);
  }

  async getSubstitutionListByPatientId(patientId: number) {
    const patient = await this.patientRepository
      .findOneByOrFail({ id: patientId })
      .catch(() => {
        throw new PatientNotFoundException();
      });

    return this.substitutionListRepository.findOneByPatientWithRelations(
      patient,
    );
  }

  async deleteSubstitutionList(substitutionListId: number) {
    const substitutionList =
      await this.substitutionListRepository.findOneByIdWithRelations(
        substitutionListId,
      );
    const { foodGroups } = substitutionList;

    if (foodGroups?.length) {
      await this.removeFoodGroupItems(foodGroups);
      await this.foodGroupRepository.remove(foodGroups);
    }

    this.substitutionListRepository.remove(substitutionList);
  }

  async updateSubstitutionList(
    substitutionListId: number,
    updateSubstitutionListDto: UpdateSubstitutionListDto,
  ) {
    const { foodGroups, observations } = updateSubstitutionListDto;

    const substitutionList =
      await this.substitutionListRepository.findOneByIdWithRelations(
        substitutionListId,
      );

    substitutionList.observations = observations;

    if (foodGroups?.length) {
      await this.removeFoodGroupItems(substitutionList.foodGroups);
      await this.foodGroupRepository.remove(substitutionList.foodGroups);

      const mappedFoodGroups = this.mapFoodGroups(foodGroups);
      substitutionList.foodGroups = mappedFoodGroups;
      await this.insertFoodGroups(mappedFoodGroups, substitutionList);
      await this.insertFoodGroupItems(mappedFoodGroups);
    }

    this.substitutionListRepository.save(substitutionList);
  }
}
