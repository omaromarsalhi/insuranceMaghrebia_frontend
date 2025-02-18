import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceOfferComponent } from './insurance-offer/insurance-offer.component';


const routes: Routes = [
  { path: 'offers', component: InsuranceOfferComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
