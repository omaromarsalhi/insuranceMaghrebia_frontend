import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category_componenets/category/category.component';
import { OfferManagerComponent } from './offer_componenets/offer-manager/offer-manager.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'categories', component: CategoryComponent },
  { path: 'offer-manager', component: OfferManagerComponent },
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
