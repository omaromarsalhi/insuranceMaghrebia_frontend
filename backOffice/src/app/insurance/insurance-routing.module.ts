import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { OfferComponent } from './offer/offer.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { AddOfferComponent } from './add-offer/add-offer.component';

const routes: Routes = [
  { path: 'categories', component: CategoryComponent },
  { path: 'offers', component: OfferComponent },
  { path: 'offer-details/:id', component: OfferDetailsComponent },
  { path: 'add-offer', component: AddOfferComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
