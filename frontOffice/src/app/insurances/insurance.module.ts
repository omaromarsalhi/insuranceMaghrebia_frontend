import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category-comaponenets/category/category.component';
import { OfferDtailsComponent } from './offer-componenets/offer-dtails/offer-dtails.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PurshasedOfferComponent } from './offer-componenets/purshased-offer/purshased-offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CategoryComponent,OfferDtailsComponent, PurshasedOfferComponent],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    SharedModule,
    SlickCarouselModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InsuranceModule { }
