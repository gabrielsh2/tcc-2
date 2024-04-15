import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthModule,
  DietsModule,
  NutritionistModule,
  PatientsModule,
} from '@modules';
import { Diet, Meal, MealItem, Nutritionist, Patient } from '@entities';
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
      entities: [Diet, Nutritionist, Patient, Meal, MealItem],
      synchronize: true,
    }),
    AuthModule,
    PatientsModule,
    NutritionistModule,
    DietsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
