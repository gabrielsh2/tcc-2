import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agenda, MealRecord, MealRecordItem } from '@entities';
import {
  AgendaNotFoundException,
  MealRecordNotFoundException,
} from '@exceptions';
import { CreateMealRecordDto, UpdateMealRecordDto } from './dtos';

@Injectable()
export class MealRecordService {
  constructor(
    @InjectRepository(MealRecord)
    private readonly mealRecordRepository: Repository<MealRecord>,
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,
    @InjectRepository(MealRecordItem)
    private readonly mealRecordItemRepository: Repository<MealRecordItem>,
  ) {}

  async create(
    agendaId: number,
    createMealRecordDto: CreateMealRecordDto,
  ): Promise<void> {
    const { mealType, mealTime, mealItems } = createMealRecordDto;

    const agenda = await this.agendaRepository
      .findOneOrFail({
        where: { id: agendaId },
      })
      .catch(() => {
        throw new AgendaNotFoundException();
      });

    const mealRecord = new MealRecord(mealType, mealTime, agenda);

    const mealRecordItems = mealItems.map(({ name, quantity }) => {
      const mealRecordItem = new MealRecordItem(name, quantity, mealRecord);
      return mealRecordItem;
    });

    await this.mealRecordRepository.save(mealRecord);
    await this.mealRecordItemRepository.save(mealRecordItems);
  }

  async update(
    mealRecordId: number,
    updateMealRecordDto: UpdateMealRecordDto,
  ): Promise<void> {
    const { mealType, mealTime, mealItems } = updateMealRecordDto;

    const mealRecord = await this.mealRecordRepository
      .findOneByOrFail({
        id: mealRecordId,
      })
      .catch(() => {
        throw new MealRecordNotFoundException();
      });

    mealRecord.mealType = mealType;
    mealRecord.mealTime = mealTime;

    await this.mealRecordRepository.save(mealRecord);

    await this.mealRecordItemRepository.delete({ mealRecord });

    const mealRecordItems = mealItems.map(({ name, quantity }) => {
      return new MealRecordItem(name, quantity, mealRecord);
    });

    await this.mealRecordItemRepository.save(mealRecordItems);
  }

  async delete(mealRecordId: number): Promise<void> {
    const mealRecord = await this.mealRecordRepository
      .findOneByOrFail({
        id: mealRecordId,
      })
      .catch(() => {
        throw new MealRecordNotFoundException();
      });

    await this.mealRecordItemRepository.delete({ mealRecord });
    await this.mealRecordRepository.remove(mealRecord);
  }

  async findByAgenda(agendaId: number): Promise<MealRecord[]> {
    const agenda = await this.agendaRepository
      .findOneOrFail({
        where: { id: agendaId },
      })
      .catch(() => {
        throw new AgendaNotFoundException();
      });

    return this.mealRecordRepository.find({
      where: {
        agenda,
      },
      relations: {
        mealRecordItems: true,
      },
    });
  }
}
