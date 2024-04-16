import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSubstitutionListDto, UpdateSubstitutionListDto } from './dtos';
import { SubstitutionListService } from './substitution-list.service';

@Controller('substitution-list')
export class SubstitutionListController {
  constructor(
    private readonly substitutionListService: SubstitutionListService,
  ) {}

  @Post('/patient/:patientId')
  async createSubstitutionList(
    @Param('patientId') patientId: number,
    @Body() createSubstitutionListDto: CreateSubstitutionListDto,
  ) {
    return this.substitutionListService.createSubstitutionList(
      patientId,
      createSubstitutionListDto,
    );
  }

  @Get('/patient/:patientId')
  async getSubstitutionListByPatientId(@Param('patientId') patientId: number) {
    return this.substitutionListService.getSubstitutionListByPatientId(
      patientId,
    );
  }

  @Delete('/:substitutionListId')
  async deleteSubstitutionList(
    @Param('substitutionListId') substitutionListId: number,
  ) {
    return this.substitutionListService.deleteSubstitutionList(
      substitutionListId,
    );
  }

  @Put('/:substitutionListId')
  async updateSubstitutionList(
    @Param('substitutionListId') substitutionListId: number,
    @Body() updateSubstitutionListDto: UpdateSubstitutionListDto,
  ) {
    return this.substitutionListService.updateSubstitutionList(
      substitutionListId,
      updateSubstitutionListDto,
    );
  }
}
