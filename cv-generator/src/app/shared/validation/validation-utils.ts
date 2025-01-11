import { ValidatorFn, Validators } from '@angular/forms';
import { ValidationRules } from './validation-models';
import { CustomValidators } from './custom-validators';

export function createValidators(rules: ValidationRules): ValidatorFn[] {
  if (rules == null) return [];

  const validators: ValidatorFn[] = [];
  if (rules.required) {
    validators.push(CustomValidators.nonEmptyValidator());
  }

  if (rules.email) validators.push(Validators.email);

  return validators;
}
