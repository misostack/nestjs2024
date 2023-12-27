import { ValidationError } from 'class-validator';

/**
 * Use to convert class validation errors to new format
 * Eg: after transform you can have some thing looks like this:
 * ```json
 * [
 *      {
 *          property: 'PropertyA,
 *          errorCode: 'isNotEmpty',
 *          errorMessage:'propertyA should not be empty',
 *          children: [],
 *      },
 *      {
 *          property: 'PropertyB,
 *          children: [
 *              {
 *                  property: 'PropertyB1,
 *                  errorCode: 'isNotEmpty',
 *                  errorMessage:'propertyB1 should not be empty',
 *              }
 *          ]
 *      }
 * ]
 * ```
 * @param errors ValidationError
 */
const transformClassValidatorErrors = (errors: ValidationError[]) => {
  return errors.map((e) => convertClassValidatorError(e));
};

const convertClassValidatorError = (error: ValidationError) => {
  const { property } = error;
  const firstError = error.constraints
    ? Reflect.ownKeys(error.constraints)[0].toString()
    : null;
  const returnError = { property, children: [] };
  if (firstError) {
    Reflect.set(returnError, 'errorCode', firstError);
    Reflect.set(returnError, 'errorMessage', error.constraints[firstError]);
  }
  // next is finding and transform error children
  if (error.children.length > 0) {
    error.children.map((e) =>
      returnError.children.push(convertClassValidatorError(e)),
    );
  }

  return returnError;
};

export { transformClassValidatorErrors };
