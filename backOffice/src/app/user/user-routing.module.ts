import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { CheckEmailComponent } from './check-email/check-email.component';
import { ConfirmMailComponent } from './confirm-mail/confirm-mail.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'signup',component: SignupComponent},
  {path: 'check-mail',component: CheckEmailComponent},
  {path: 'activate-account',component: ConfirmMailComponent},
  {path: 'signin',component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
