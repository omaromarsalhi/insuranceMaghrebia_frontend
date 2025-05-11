import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {CamplaintComponent} from "./complaints/camplaint/camplaint.component";
import {ShowComplaintComponent} from "./complaints/show-complaint/show-complaint.component";
import {ResponseComplaintComponent} from "./complaints/response-complaint/response-complaint.component";
import {PopupComponent} from "./complaints/popup/popup.component";
import { ProfileComponent } from './user/profile/profile.component';
import { completeProfileGuard } from './core/guards/complete-profile.guard';
import { blockEntryGuard } from './core/guards/block-entry.guard';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { JobsComponent } from './hr/jobs/jobs.component';
import { JobComponent } from './hr/job/job.component';
import { CandidateComponent } from './hr/candidate/candidate.component';
import { AddClaimPageComponent } from './claim/pages/add-claim-page/add-claim-page.component';
import { ClaimsPageComponent } from './claim/pages/claims-page/claims-page.component';
import { ClaimDetailsPageComponent } from './claim/pages/claim-details-page/claim-details-page.component';


const routes: Routes = [
  //{ path: '', redirectTo:'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent , canActivate : [completeProfileGuard] },
  { path: 'account/profile', component: ProfileComponent , canActivate : [completeProfileGuard] },
  { path: 'account/edit-profile', component: EditProfileComponent , canActivate : [blockEntryGuard] },
  { path: 'account/change-password', component: ChangePasswordComponent , canActivate : [completeProfileGuard] },
  { path: 'jobs', component: JobsComponent , canActivate : [completeProfileGuard] },
  { path: 'job', component: JobComponent , canActivate : [completeProfileGuard] },
  { path: 'job/apply', component: CandidateComponent , canActivate : [completeProfileGuard] },
  {path: 'claim/add',component: AddClaimPageComponent,canActivate : [completeProfileGuard]},
  {
    path: 'claims',
    component: ClaimsPageComponent,canActivate : [completeProfileGuard]
  },
  {
    path: 'claims/details/:id',
    component: ClaimDetailsPageComponent,canActivate : [completeProfileGuard]
  },
  {path: 'complaints', loadChildren: () => import('./complaints/complaints-module').then(m => m.ComplaintsModule) ,canActivate : [completeProfileGuard] },
  { path: '', component: HomeComponent }, // Default route for the home page
  { path: 'home', component: HomeComponent }, // Route for /home
  { path: 'insurance', loadChildren: () => import('./insurances/insurance-routing.module').then(m => m.InsuranceRoutingModule) },
  { path: 'payments', loadChildren: () => import('./payment/payment-routing.module').then(m => m.PaymentRoutingModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
