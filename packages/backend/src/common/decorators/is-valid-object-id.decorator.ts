import type { ValidationOptions, ValidationArguments } from 'class-validator';
import { registerDecorator } from 'class-validator';
import { isValidObjectId } from 'mongoose';

export function IsValidObjectId(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isValidObjectId',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, _: ValidationArguments) {
          return isValidObjectId(value);
        },
        defaultMessage: (args) => `${args.property} is not a valid objectid.`,
      },
    });
  };
}
