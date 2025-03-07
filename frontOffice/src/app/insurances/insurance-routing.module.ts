import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category-comaponenets/category/category.component';
import { OfferDtailsComponent } from './offer-componenets/offer-dtails/offer-dtails.component';
import { PurshasedOfferComponent } from './offer-componenets/purshased-offer/purshased-offer.component';

const routes: Routes = [
  { path: 'categories', component: CategoryComponent  },
  { path: 'offer-details/:categoryId', component: OfferDtailsComponent  },
  { path: 'offer-pushasing/:formId/:offerId', component: PurshasedOfferComponent  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
