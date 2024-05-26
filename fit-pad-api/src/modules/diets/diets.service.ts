import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diet, Meal, MealItem, Patient } from '@entities';
import { PatientNotFoundException } from '@exceptions';
import { DietRepository } from '@repositories';
import { CreateDietDto, MealDto, UpdateDietDto } from './dtos';

@Injectable()
export class DietsService {
  constructor(
    @InjectRepository(Diet)
    private readonly dietRepository: DietRepository,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
    @InjectRepository(MealItem)
    private readonly mealItemRepository: Repository<MealItem>,
  ) {}

  private getMealItems(meals: Meal[]): MealItem[] {
    return meals.reduce((currentMealItems, meal) => {
      const { mealItems } = meal;
      mealItems.forEach((mealItem) => {
        mealItem.meal = meal;
      });

      return [...currentMealItems, ...mealItems];
    }, []);
  }

  private async insertMealsItems(meals: Meal[]) {
    const mealItemsToInset = this.getMealItems(meals);

    await this.mealItemRepository.insert(mealItemsToInset);
  }

  private async insertMeals(meals: Meal[], diet: Diet) {
    meals.forEach((meal) => {
      meal.diet = diet;
    });

    await this.mealRepository.insert(meals);
  }

  private mapMeals(meals: MealDto[]) {
    return meals?.map(({ items, type, mealTime }) => {
      const mealItems = items?.map(
        ({ name, quantity }) => new MealItem(name, quantity),
      );
      const meal = new Meal(type, mealTime, mealItems);

      return meal;
    });
  }

  private async removeMealItems(meals: Meal[]): Promise<void> {
    const mealItems = this.getMealItems(meals);

    await this.mealItemRepository.remove(mealItems);
  }

  async createDiet(
    patientId: number,
    createDietDto: CreateDietDto,
  ): Promise<void> {
    const { meals, name, observations } = createDietDto;

    const patient = await this.patientRepository
      .findOneByOrFail({
        id: patientId,
      })
      .catch(() => {
        throw new PatientNotFoundException();
      });

    const dietMeals = this.mapMeals(meals);

    const diet = new Diet(name, observations, patient, dietMeals);
    await this.dietRepository.save(diet);

    await this.insertMeals(dietMeals, diet);
    await this.insertMealsItems(dietMeals);
  }

  async updateDiet(
    dietId: number,
    updateDietDto: UpdateDietDto,
  ): Promise<void> {
    const { meals, name, observations } = updateDietDto;

    const diet = await this.dietRepository.findWithMealRelations(dietId);

    if (name) {
      diet.name = name;
    }

    diet.observations = observations;

    if (meals?.length) {
      await this.removeMealItems(diet.meals);
      await this.mealRepository.remove(diet.meals);

      const dietMeals = this.mapMeals(meals);
      diet.meals = dietMeals;
      await this.insertMeals(dietMeals, diet);
      await this.insertMealsItems(dietMeals);
    }

    await this.dietRepository.save(diet);
  }

  async getDietsByPatientId(patientId: number) {
    const patient = await this.patientRepository
      .findOneByOrFail({
        id: patientId,
      })
      .catch(() => {
        throw new PatientNotFoundException();
      });

    return this.dietRepository.findByPatient(patient);
  }

  async deleteDiet(dietId: number) {
    const diet = await this.dietRepository.findWithMealRelations(dietId);
    const { meals } = diet;

    if (meals?.length) {
      await this.removeMealItems(meals);
      await this.mealRepository.remove(meals);
    }

    this.dietRepository.remove(diet);
  }
}
