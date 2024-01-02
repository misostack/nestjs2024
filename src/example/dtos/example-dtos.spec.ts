import { validate } from 'class-validator';
import { CreateExampleDto } from './example-dtos';
import { plainToInstance } from 'class-transformer';
import { CLASS_VALIDATOR_VALIDATION_OPTIONS } from '@modules/constants';
import { describe } from 'node:test';
import { isEqual } from 'lodash';
import { transformClassValidatorErrors } from '@modules/helpers/class-validator.helpers';
import { inspect } from 'node:util';

describe('Test ExampleDtos', () => {
  describe('CreateExampleDto', () => {
    it('Should only included required fields for create dto', async () => {
      const plainValue: Partial<CreateExampleDto> = {
        name: 'a',
        links: [
          {
            name: '',
            url: '',
          },
        ],
      };
      const object = plainToInstance(CreateExampleDto, plainValue);
      const errors = await validate(object, CLASS_VALIDATOR_VALIDATION_OPTIONS);
      const errorsAfterTransform = transformClassValidatorErrors(errors);
      console.log(inspect(errorsAfterTransform, true, 10));
      const expectedErrorProperty = [''].sort();
      const expectedValue = isEqual(
        errors.map((e) => e.property).sort(),
        expectedErrorProperty,
      );
      expect(expectedValue).toBeTruthy();
    });
  });
});
