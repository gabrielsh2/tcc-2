import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nutritionist, Patient } from '@entities';
import { NutritionistRepository, PatientRepository } from '@repositories';
import { UserType } from '@enums';
import { LoginDto, LoginResponseDto } from '../dtos';
import { UnauthorizedException } from '@exceptions';

@Injectable()
export class AuthLoginService {
  constructor(
    @InjectRepository(Nutritionist)
    private nutritionistsRepository: NutritionistRepository,
    @InjectRepository(Patient)
    private patientsRepository: PatientRepository,
  ) {}

  private async getNutritionist(
    email: string,
    password: string,
  ): Promise<Nutritionist> {
    const user = await this.nutritionistsRepository.findByCredentials(
      email,
      password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private async getPatient(email: string, password: string): Promise<Patient> {
    const user = await this.patientsRepository.findByCredentials(
      email,
      password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private getLoginResponseDto(id: number): LoginResponseDto {
    return new LoginResponseDto(id);
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password, userType } = loginDto;

    if (userType === UserType.NUTRITIONIST) {
      const nutritionist = await this.getNutritionist(email, password);
      return this.getLoginResponseDto(nutritionist.id);
    } else if (userType === UserType.PATIENT) {
      const patient = await this.getPatient(email, password);
      return this.getLoginResponseDto(patient.id);
    }
  }
}
