import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anthropometry, Patient } from '@entities';
import { AnthropometryService } from './anthropometry.service';
import { AnthropometryController } from './anthropometry.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Anthropometry, Patient])],
  providers: [AnthropometryService],
  controllers: [AnthropometryController],
})
export class AnthropometryModule {}
