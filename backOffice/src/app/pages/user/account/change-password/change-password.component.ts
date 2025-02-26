import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordRequest } from 'src/app/core/models/user/change-password-request';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm : FormGroup;
  submitted = false;
  errormsg = '';
  breadCrumbItems: Array<{}>;
  userId : string;
  constructor(private userService : UserService,private authService : AuthService,private formBuilder : FormBuilder ,private router : Router ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Account' }, { label: 'Change Password', active: true }];
    this.changePasswordForm = this.formBuilder.group({
      currentPassword : ['', [Validators.required]],
      newPassword : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword : ['', [Validators.required]]
    });
    this.userId = this.authService.getCurrentUserId();
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  savePassword() {
    if(this.changePasswordForm.valid){
      var changePasswordRequest : ChangePasswordRequest = {
        currentPassword : this.f.currentPassword.value,
        newPassword : this.f.newPassword.value,
        confirmPassword: this.f.confirmPassword.value
      }
      this.userService.changePassword(changePasswordRequest,this.userId).subscribe(
        (data) => {
          this.router.navigate(["/account/profile"]);
        },
        (error) => {
          console.log(error);
          this.errormsg=error.error.businessErrorDescription;
        }
      )
    }
    this.submitted=true;
  }

}
