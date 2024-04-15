import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nutritionist, Patient } from '@entities';
import { NutritionistController } from './nutritionist.controller';
import { NutritionistService } from './nutritionist.service';
import { NUTRITIONIST_PROVIDER } from '@providers';

@Module({
  imports: [TypeOrmModule.forFeature([Nutritionist, Patient])],
  controllers: [NutritionistController],
  providers: [NUTRITIONIST_PROVIDER, NutritionistService],
})
export class NutritionistModule {}
