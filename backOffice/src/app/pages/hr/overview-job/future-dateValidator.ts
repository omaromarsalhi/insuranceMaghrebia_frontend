import { AbstractControl, ValidatorFn } from '@angular/forms';

export function futureDateValidator(minDays: number): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return null;
    }

    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minAllowedDate = new Date();
    minAllowedDate.setDate(today.getDate() + minDays);

    if (selectedDate < today) {
      return { pastDate: true };
    }

    if (selectedDate < minAllowedDate) {
      return { minDate: true };
    }

    return null;
  };
}
