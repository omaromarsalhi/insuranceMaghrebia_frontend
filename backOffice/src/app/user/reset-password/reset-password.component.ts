import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetRequest } from 'src/app/core/models/user/password-reset-request';
import { PasswordService } from 'src/app/core/services/user/password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  error = '';
  year: number = new Date().getFullYear();
  constructor(private formBuilder: FormBuilder, private router: Router, private passwordService: PasswordService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.passwordService.verifyToken(this.route.snapshot.queryParams['token']).subscribe(
      (data) => {
        this.resetForm = this.formBuilder.group({
          password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
        });
      },
      (error) => {
        this.router.navigate(['/account/page404'], { queryParams: { error: error.error.businessErrorDescription } });
      }
    );

  }

  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.resetForm.invalid) {
      return;
    }
    const passwordResetRequest: PasswordResetRequest = {
      password: this.f.password.value,
      confirmPassword: this.f.confirmPassword.value
    }
    const token = this.route.snapshot.queryParams['token'];
          this.passwordService.resetPassword(token,passwordResetRequest).subscribe(
            (data) => {
              this.router.navigate(['/account/signin']);
            },
            (error) => {
              console.log(error);
              this.error = error.error.businessErrorDescription;
            }
          ) 
  }
}
