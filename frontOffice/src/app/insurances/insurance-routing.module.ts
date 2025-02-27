import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category-comaponenets/category/category.component';
import { OfferDtailsComponent } from './offer-componenets/offer-dtails/offer-dtails.component';

const routes: Routes = [
  { path: 'categories', component: CategoryComponent  },
  { path: 'offer-details', component: OfferDtailsComponent  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
