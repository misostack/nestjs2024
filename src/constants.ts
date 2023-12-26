import { ValidationPipeOptions } from '@nestjs/common';

const CLASS_VALIDATOR_VALIDATION_OPTIONS: ValidationPipeOptions = {
  skipMissingProperties: false,
  stopAtFirstError: true,
};

export { CLASS_VALIDATOR_VALIDATION_OPTIONS };
