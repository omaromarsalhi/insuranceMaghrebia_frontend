import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user/user';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ageValidator } from './ageValidator';
import { Gender } from 'src/app/core/models/user/gender'; // Import the Gender enum
import { UpdateProfileRequest } from 'src/app/core/models/user/update-profile-request';
import { MatDialog } from '@angular/material/dialog';
import { EmailChangeDialogComponent } from '../email-change-dialog/email-change-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userForm!: FormGroup;
  user?: User;
  genderOptions = Object.values(Gender);
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.userService.getProfile(this.authService.getCurrentUserId()).subscribe({
      next: (data) => {
        this.user = data;
        console.log(this.user);
        this.userForm = this.formBuilder.group({
          firstName: [this.user?.firstname, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          lastName: [this.user?.lastname, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          email: [this.user?.email, [Validators.required, Validators.email]],
          dateOfBirth: [this.user?.dateOfBirth, [Validators.required, ageValidator(18)]],
          gender: [this.user?.gender, [Validators.required]],
          phone: [this.user?.phone, [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
          address: [this.user?.address, [Validators.required, Validators.maxLength(100)]]
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    if (this.userForm.valid && this.user?.id) {
      const updatedUser: UpdateProfileRequest = {
        firstName: this.f?.['firstName'].value,
        lastName: this.f?.['lastName'].value,
        email: this.f?.['email'].value,
        dateOfBirth: this.f?.['dateOfBirth'].value,
        gender: this.f?.['gender'].value,
        phone: this.f?.['phone'].value,
        address: this.f?.['address'].value
      };
      this.userService.updateUserProfile(this.user.id, updatedUser).subscribe({
        next: (data) => {
            this.router.navigate(['/account/profile']);
        },
        error: (err) => {
          if (err.status === 409) {
            this.userForm?.controls['email'].setErrors({ notUnique: true });
          }
          if (err.status === 422) {
            const dialogRef = this.dialog.open(EmailChangeDialogComponent, {
              disableClose: true,
            });
            setTimeout(() => {
              dialogRef.close();
              this.authService.logout();
            }, 5000);
          }
        }
      }
      );
    }
  }
}