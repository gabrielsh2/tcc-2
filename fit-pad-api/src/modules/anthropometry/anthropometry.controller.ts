import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AnthropometryService } from './anthropometry.service';
import { CreateAnthropometryDto, UpdateAnthropometryDto } from './dtos';

@Controller('anthropometry')
export class AnthropometryController {
  constructor(private readonly anthropometryService: AnthropometryService) {}

  @Post('/patient/:patientId')
  async createAnthropometry(
    @Param('patientId') patientId: number,
    @Body() createAnthropometryDto: CreateAnthropometryDto,
  ) {
    return this.anthropometryService.create(patientId, createAnthropometryDto);
  }

  @Put('/:anthropometryId')
  async updateAnthropometry(
    @Param('anthropometryId') anthropometryId: number,
    @Body() updateAnthropometryDto: UpdateAnthropometryDto,
  ) {
    return this.anthropometryService.update(
      anthropometryId,
      updateAnthropometryDto,
    );
  }

  @Get('/patient/:patientId')
  async findAllByPatient(@Param('patientId') patientId: number) {
    return this.anthropometryService.findAllByPatient(patientId);
  }
}
