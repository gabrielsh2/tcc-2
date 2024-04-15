import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserType } from '@enums';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  userType: UserType;
}
