import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { OfferManagerComponent } from './offer-manager/offer-manager.component';

const routes: Routes = [
  { path: 'categories', component: CategoryComponent },
  { path: 'offer-manager', component: OfferManagerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
