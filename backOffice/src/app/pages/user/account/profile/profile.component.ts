import { tokenName } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ageValidator } from 'src/app/user/ageValidator';
import { EmailRequest } from 'src/app/core/models/user/email-request';
import { fullName, User } from 'src/app/core/models/user/user';
import { UpdateProfileRequest } from 'src/app/core/models/user/update-profile-request';
import { Gender } from 'src/app/core/models/user/gender';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  breadCrumbItems: Array<{}>;
  constructor(private authService: AuthService, private userService: UserService, private formBuilder: FormBuilder, private modalService: NgbModal, private cdRef: ChangeDetectorRef) { }
  user: User;
  fullName: string;
  successmsg = false;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Account' }, { label: 'Profile', active: true }];
    this.userService.getProfile(this.authService.getCurrentUserId()).subscribe(
      (data) => {
        this.user = data;
        this.userForm = this.formBuilder.group({
          firstName: [this.user.firstname, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          lastName: [this.user.lastname, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          email: [this.user.email, [Validators.required, Validators.email]],
          dateOfBirth: [this.user.dateOfBirth, [Validators.required, ageValidator(18)]],
          gender: [this.user.gender, [Validators.required]],
          phone: [this.user.phone, [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
          address: [this.user.address, [Validators.required, Validators.maxLength(100)]]
        });
        this.fullName = fullName(this.user);
      },
      (error) => {
      }
    );
  }

  get f() {
    return this.userForm.controls;
  }
  openModal(content: any) {
    this.modalService.open(content);
  }

  saveChanges() {
    if (this.userForm.valid) {
      const updateProfileRequest: UpdateProfileRequest = {
        firstName: this.f.firstName.value,
        lastName: this.f.lastName.value,
        email: this.f.email.value,
        dateOfBirth: this.f.dateOfBirth.value,
        gender: this.f.gender.value,
        phone: this.f.phone.value,
        address: this.f.address.value
      }
      this.userService.updateUserProfile(this.user.id, updateProfileRequest).subscribe(
        {
          next: (data) => {
            this.user=data;
            this.userForm.patchValue({
              firstName: this.user.firstname,
              lastName: this.user.lastname,
              email: this.user.email,
              dateOfBirth: this.user.dateOfBirth,
              gender: this.user.gender,
              phone: this.user.phone,
              address: this.user.address
            });
            this.fullName = fullName(this.user);
            this.triggerChangeDetection();
            this.modalService.dismissAll();
          },
          error: (err) => {
            if(err.status== 409) {
              this.userForm.controls.email.setErrors({ notUnique: true });
            }
            if(err.status == 422){
              this.successmsg= true;
               setTimeout(() => {
                 this.authService.logout();
                 this.modalService.dismissAll();
               }, 5000);
            }
          }
        }
      );

    }
    this.submitted = true
  }
  Gender = Gender
  getGenderValues(): string[] {
    return Object.values(Gender);
  }
  triggerChangeDetection() {
    this.cdRef.detectChanges();
  }
}
