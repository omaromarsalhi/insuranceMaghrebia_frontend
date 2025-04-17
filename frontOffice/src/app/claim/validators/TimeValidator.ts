import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function timeNotInFutureValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedTime = new Date(control.value).getTime(); // Convert input to timestamp
    const now = Date.now();

    return selectedTime > now ? { timeInFuture: true } : null;
  };
}