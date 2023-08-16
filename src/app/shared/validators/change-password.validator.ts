import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function changePasswordMismatchValidator(fieldOne: string, fieldTwo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fieldOneValue = control.get(fieldOne)?.value;
    const fieldTwoValue = control.get(fieldTwo)?.value;
    return fieldOneValue && fieldTwoValue && fieldOneValue === fieldTwoValue
      ? { changePassword: true }
      : null;
  };
}
