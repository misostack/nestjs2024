import { validate } from 'class-validator';
import { CreatePlanDto, UpdatePlanDto } from './plan-dtos';
import { plainToInstance } from 'class-transformer';
import { CLASS_VALIDATOR_VALIDATION_OPTIONS } from '@modules/constants';
import { describe } from 'node:test';
import { isEqual } from 'lodash';

describe('Test PlanDtos', () => {
  describe('createPlanDto', () => {
    it('Should only included required fields for create dto', async () => {
      const plainValue: Partial<CreatePlanDto> = {};
      const object = plainToInstance(CreatePlanDto, plainValue);
      const errors = await validate(object, CLASS_VALIDATOR_VALIDATION_OPTIONS);
      const expectedErrorProperty = ['startDate', 'dueDate', 'name'].sort();
      const expectedValue = isEqual(
        errors.map((e) => e.property).sort(),
        expectedErrorProperty,
      );
      expect(expectedValue).toBeTruthy();
    });
  });
  describe('updatePlanDto', () => {
    it('Should only included required fields for update dto', async () => {
      const plainValue: Partial<UpdatePlanDto> = {};
      const object = plainToInstance(UpdatePlanDto, plainValue);
      const errors = await validate(object, CLASS_VALIDATOR_VALIDATION_OPTIONS);
      const expectedErrorProperty = ['id'];
      const expectedValue = isEqual(
        errors.map((e) => e.property),
        expectedErrorProperty,
      );
      expect(expectedValue).toBeTruthy();
    });
  });
});
