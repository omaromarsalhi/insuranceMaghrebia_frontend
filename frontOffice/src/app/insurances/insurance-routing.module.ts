import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category-comaponenets/category/category.component';
import { OfferDtailsComponent } from './offer-componenets/offer-dtails/offer-dtails.component';
import { PurshasedOfferComponent } from './offer-componenets/purshased-offer/purshased-offer.component';
import { OffersListComponent } from './offer-componenets/offers-list/offers-list.component';
import { GenerateQuoteComponent } from './offer-componenets/generate-quote/generate-quote.component';
import { completeProfileGuard } from '../core/guards/complete-profile.guard';

const routes: Routes = [
  { path: 'generate-quote', component: GenerateQuoteComponent  },
  { path: 'categories/:target', component: CategoryComponent  },
  { path: 'offer-details/:offerId', component: OfferDtailsComponent  },
  { path: 'offer-list/:categoryId', component: OffersListComponent  },
  { path: 'offer-pushasing/:formId/:offerId', component: PurshasedOfferComponent, canActivate : [completeProfileGuard]  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
