import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddClaimPageComponent } from './claim/pages/add-claim-page/add-claim-page.component';
import { ClaimsPageComponent } from './claim/pages/claims-page/claims-page.component';
import { ClaimDetailsPageComponent } from './claim/pages/claim-details-page/claim-details-page.component';

const routes: Routes = [
  { path: '', 
    component: HomeComponent 
  }, // Default route for the home page
  { 
    path: 'claim/add', 
    component: AddClaimPageComponent,
  },
  { 
    path: 'home', 
    component: HomeComponent 
  }, // Route for /home
  {
    path: 'claims', 
    component: ClaimsPageComponent
  },
  {
    path: 'claims/details/:id', 
    component: ClaimDetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }