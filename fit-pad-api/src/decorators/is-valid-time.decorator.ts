import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

function isValidTime(value: string): boolean {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

  return timeRegex.test(value);
}

export function IsTimeFormat(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isTimeFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value === undefined || value === null) {
            return true; // Permite valores nulos ou indefinidos
          }
          return typeof value === 'string' && isValidTime(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser no formato HH:MM:SS`;
        },
      },
    });
  };
}
