import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthLoginService, AuthRegisterService } from './services';
import { LoginDto, RegisterDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authRegisterService: AuthRegisterService,
    private readonly authLoginService: AuthLoginService,
  ) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authRegisterService.register(registerDto);
  }

  @HttpCode(200)
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authLoginService.login(loginDto);
  }
}
