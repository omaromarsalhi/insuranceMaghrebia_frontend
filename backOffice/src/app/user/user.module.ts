import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '../shared/ui/ui.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CheckEmailComponent } from './check-email/check-email.component';
import { ConfirmMailComponent } from './confirm-mail/confirm-mail.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    SignupComponent,
    CheckEmailComponent,
    ConfirmMailComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    UIModule,
    CarouselModule,
    NgOtpInputModule
  ]
})
export class UserModule { }
