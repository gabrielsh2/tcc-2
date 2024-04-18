import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthModule,
  DietsModule,
  NutritionistModule,
  PatientsModule,
  SubstitutionListModule,
  MedicalPrescriptionModule,
  TaskModule,
} from '@modules';
import {
  Diet,
  FoodGroup,
  FoodGroupItem,
  Meal,
  MealItem,
  MedicalPrescription,
  Nutritionist,
  Patient,
  SubstitutionList,
  Task,
} from '@entities';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'toor',
      database: 'fitPad',
      entities: [
        Diet,
        Nutritionist,
        Patient,
        Meal,
        MealItem,
        SubstitutionList,
        FoodGroup,
        FoodGroupItem,
        MedicalPrescription,
        Task,
      ],
      synchronize: true,
    }),
    AuthModule,
    PatientsModule,
    NutritionistModule,
    DietsModule,
    SubstitutionListModule,
    MedicalPrescriptionModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
