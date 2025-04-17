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
import { AddClaimPageComponent } from './claim/pages/add-claim-page/add-claim-page.component';
import { ClaimsPageComponent } from './claim/pages/claims-page/claims-page.component';
import { ClaimDetailsPageComponent } from './claim/pages/claim-details-page/claim-details-page.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './payment/checkout/checkout.component';
import { PaymentContractsComponent } from './payment/payment-contracts/payment-contracts.component';
import { PaymentPlanDetailsComponent } from './payment/payment-plan-details/payment-plan-details.component';
import { SignatureComponent } from './payment/signature/signature.component';


const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent , canActivate : [completeProfileGuard] },
  { path: 'account/profile', component: ProfileComponent , canActivate : [completeProfileGuard] },
  { path: 'account/edit-profile', component: EditProfileComponent , canActivate : [blockEntryGuard] },
  { path: 'account/change-password', component: ChangePasswordComponent , canActivate : [completeProfileGuard] },
  { path: 'jobs', component: JobsComponent , canActivate : [completeProfileGuard] },
  { path: 'job', component: JobComponent , canActivate : [completeProfileGuard] },
  { path: 'job/apply', component: CandidateComponent , canActivate : [completeProfileGuard] },
  {path: 'claim/add',component: AddClaimPageComponent,},
  {
    path: 'claims',
    component: ClaimsPageComponent
  },
  {
    path: 'claims/details/:id',
    component: ClaimDetailsPageComponent
  },
  { path: 'insurance', loadChildren: () => import('./insurances/insurance-routing.module').then(m => m.InsuranceRoutingModule) },
  { path: 'payments', loadChildren: () => import('./payment/payment-routing.module').then(m => m.PaymentRoutingModule) },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
