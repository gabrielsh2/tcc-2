import { ConflictException } from '@nestjs/common';

export class DuplicatedUserException extends ConflictException {
  constructor() {
    super('Já existe um usuário com esse email!');
  }
}
