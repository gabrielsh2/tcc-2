import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { Patient } from '@entities';
import { PATIENT_PROVIDER } from '@providers';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientsController],
  providers: [PATIENT_PROVIDER, PatientsService],
})
export class PatientsModule {}
