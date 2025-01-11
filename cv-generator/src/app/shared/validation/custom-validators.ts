import { AbstractControl, ValidatorFn } from '@angular/forms';
import { StringHelper } from '../utils/string-helper';

export class CustomValidators {
  public static nonEmptyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string =
        control.value == null ? '' : control.value.toString();
      const trimmedValue = value.trim();

      if (StringHelper.isNullEmptyOrWhiteSpace(trimmedValue)) {
        return { required: true };
      }
      return null;
    };
  }
}
