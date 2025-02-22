import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { CheckEmailComponent } from './check-email/check-email.component';
import { ConfirmMailComponent } from './confirm-mail/confirm-mail.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {path: 'signup',component: SignupComponent},
  {path: 'check-mail',component: CheckEmailComponent},
  {path: 'activate-account',component: ConfirmMailComponent},
  {path: 'signin',component: LoginComponent},
  {path: 'forget-password',component: ForgetPasswordComponent},
  {path: 'reset-password',component: ResetPasswordComponent},
  {path: 'page404',component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
