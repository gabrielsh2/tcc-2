import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nutritionist, Patient } from '@entities';
import { AuthController } from './auth.controller';
import { AuthLoginService, AuthRegisterService } from './services';
import { NUTRITIONIST_PROVIDER, PATIENT_PROVIDER } from '@providers';

@Module({
  imports: [TypeOrmModule.forFeature([Nutritionist, Patient])],
  controllers: [AuthController],
  providers: [
    NUTRITIONIST_PROVIDER,
    PATIENT_PROVIDER,
    AuthRegisterService,
    AuthLoginService,
  ],
})
export class AuthModule {}
