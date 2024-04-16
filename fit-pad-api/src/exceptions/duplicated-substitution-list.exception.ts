import { ConflictException } from '@nestjs/common';

export class DuplicatedSubstitutionListException extends ConflictException {
  constructor() {
    super('Já existe uma lista de substituição vinculada a esse usuário!');
  }
}
