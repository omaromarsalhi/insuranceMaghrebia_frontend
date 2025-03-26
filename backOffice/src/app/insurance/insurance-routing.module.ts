import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category_componenets/category/category.component';
import { OfferManagerComponent } from './offer_components/offer-manager/offer-manager.component';
import { ChatComponent } from './chat/chat.component';
import { OfferViewComponent } from './offer_components/offer-view/offer-view.component';
import { OfferDetailComponent } from './offer_components/offer-detail/offer-detail.component';

const routes: Routes = [
  { path: 'categories', component: CategoryComponent },
  { path: 'offer-manager', component: OfferManagerComponent },
  { path: 'offers', component: OfferViewComponent },
  { path: 'offer/detail/:offerId', component: OfferDetailComponent },
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
