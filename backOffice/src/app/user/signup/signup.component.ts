import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ageValidator } from '../ageValidator';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { RegistrationRequest } from 'src/app/core/models/registration-request';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;

  year: number = new Date().getFullYear();

  genderOptions = [
    { value: 'MALE', label: 'Male' },
    { value: 'FEMALE', label: 'Female' }
  ];
  userExist = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    if (this.authenticationService.getCurrentUserEmail()) {
      this.authenticationService.redirectFromLogin();
    }
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      dateOfBirth: ['', [Validators.required, ageValidator(18)]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      address: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  get f() { return this.signupForm.controls; }


  onSubmit() {
    this.submitted = true;


    if (this.signupForm.invalid) {
      return;
    }
    const registrationRequest: RegistrationRequest = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      email: this.f.email.value,
      password: this.f.password.value,
      dateOfBirth: this.f.dateOfBirth.value,
      gender: this.f.gender.value,
      phone: this.f.phone.value,
      address: this.f.address.value
    };
    this.authenticationService.register(registrationRequest)
      .subscribe(
        (data) => {
          this.successmsg = true;
          if (this.successmsg) {
            this.router.navigate(['/account/check-mail'], { queryParams: { verify: "verification" } });
          }
        },
        (error) => {
          this.signupForm.controls.email.setErrors({ notUnique: true });
        }
      );
  }

}
