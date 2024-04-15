import { HttpStatus, HttpException } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor() {
    super('Não autorizado!', HttpStatus.UNAUTHORIZED);
  }
}
