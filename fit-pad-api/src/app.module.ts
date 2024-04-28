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
  AnthropometryModule,
  AgendaModule,
  MealRecordModule,
} from '@modules';
import {
  Agenda,
  Anthropometry,
  DailyTask,
  Diet,
  FoodGroup,
  FoodGroupItem,
  Meal,
  MealItem,
  MealRecord,
  MealRecordItem,
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
        Anthropometry,
        Agenda,
        DailyTask,
        MealRecord,
        MealRecordItem,
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
    AnthropometryModule,
    AgendaModule,
    MealRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
