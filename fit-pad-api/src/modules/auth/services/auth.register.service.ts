import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nutritionist, Patient } from '@entities';
import { UserType } from '@enums';
import { DuplicatedUserException } from '@exceptions';
import { RegisterDto, RegisterResponseDto } from '../dtos';

@Injectable()
export class AuthRegisterService {
  constructor(
    @InjectRepository(Nutritionist)
    private nutritionistsRepository: Repository<Nutritionist>,
    @InjectRepository(Patient)
    private patientsRepository: Repository<Nutritionist>,
  ) {}

  private async registerNutritionist(
    fullName: string,
    email: string,
    password: string,
  ): Promise<Nutritionist> {
    const nutritionist = new Nutritionist();
    nutritionist.fullName = fullName;
    nutritionist.email = email;
    nutritionist.userPassword = password;

    return this.nutritionistsRepository.save(nutritionist);
  }

  private async registerPatient(
    fullName: string,
    email: string,
    password: string,
  ): Promise<Nutritionist> {
    const patient = new Patient();
    patient.fullName = fullName;
    patient.email = email;
    patient.userPassword = password;

    return this.patientsRepository.save(patient);
  }

  async register(registerDto: RegisterDto) {
    const { userType, email, fullName, password } = registerDto;

    const nutritionist = await this.nutritionistsRepository.findOneBy({
      email,
    });
    const patient = await this.patientsRepository.findOneBy({ email });

    if (nutritionist || patient) {
      throw new DuplicatedUserException();
    }

    if (userType === UserType.NUTRITIONIST) {
      const createdUser = await this.registerNutritionist(
        fullName,
        email,
        password,
      );

      return new RegisterResponseDto(createdUser.id);
    } else if (userType === UserType.PATIENT) {
      const createdUser = await this.registerPatient(fullName, email, password);

      return new RegisterResponseDto(createdUser.id);
    }
  }
}
