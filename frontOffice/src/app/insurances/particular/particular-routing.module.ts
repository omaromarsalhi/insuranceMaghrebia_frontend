import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { OfferDtailsComponent } from './offer-dtails/offer-dtails.component';

const routes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'offerDetails', component: OfferDtailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticularRoutingModule { }
