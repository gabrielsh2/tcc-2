import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diet, Meal, MealItem, Patient } from '@entities';
import { DIET_PROVIDER } from '@providers';
import { DietsController } from './diets.controller';
import { DietsService } from './diets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Diet, Patient, Meal, MealItem])],
  controllers: [DietsController],
  providers: [DIET_PROVIDER, DietsService],
})
export class DietsModule {}
