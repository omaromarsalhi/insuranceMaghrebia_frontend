import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { completeProfileGuard } from './core/guards/complete-profile.guard';
import { blockEntryGuard } from './core/guards/block-entry.guard';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { JobsComponent } from './hr/jobs/jobs.component';
import { JobComponent } from './hr/job/job.component';
import { CandidateComponent } from './hr/candidate/candidate.component';

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent , canActivate : [completeProfileGuard] }, 
  { path: 'account/profile', component: ProfileComponent , canActivate : [completeProfileGuard] }, 
  { path: 'account/edit-profile', component: EditProfileComponent , canActivate : [blockEntryGuard] }, 
  { path: 'account/change-password', component: ChangePasswordComponent , canActivate : [completeProfileGuard] }, 
  { path: 'jobs', component: JobsComponent , canActivate : [completeProfileGuard] }, 
  { path: 'job', component: JobComponent , canActivate : [completeProfileGuard] }, 
  { path: 'job/apply', component: CandidateComponent , canActivate : [completeProfileGuard] }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }