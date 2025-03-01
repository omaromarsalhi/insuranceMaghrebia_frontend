import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordRequest } from 'src/app/core/models/user/change-password-request';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm !: FormGroup;
  userId?: string | null;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router) { }
  errormsg = '';
  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required]]
    });
    this.userId = this.authService.getCurrentUserId();
  }
  get f() {
    return this.changePasswordForm.controls;
  }
  onSubmit() {
    if (this.changePasswordForm.valid) {
      var changePasswordRequest: ChangePasswordRequest = {
        currentPassword: this.f?.['currentPassword'].value,
        newPassword: this.f?.['newPassword'].value,
        confirmPassword: this.f?.['confirmPassword'].value
      }
      this.userService.changePassword(changePasswordRequest, this.userId!).subscribe(
        {
          next: (data) => {
            this.router.navigate(["/account/profile"]);
          },
          error: (error) => {
            this.errormsg = error.error.businessErrorDescription;
          }
        }
      )
    }
  }
}
