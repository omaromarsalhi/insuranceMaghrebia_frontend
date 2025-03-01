import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ageValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null; 

    var today = new Date();
    var birthDate = new Date(value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {

      age--;
    }

    if (age >= minAge) {
      return null; 
    } else {
      return { 'ageInvalid': true }; 
    }
  };
}
