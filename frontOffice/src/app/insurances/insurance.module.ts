import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category-comaponenets/category/category.component';
import { OfferDtailsComponent } from './offer-componenets/offer-dtails/offer-dtails.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [CategoryComponent,OfferDtailsComponent],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    SharedModule,
    SlickCarouselModule,
    FontAwesomeModule
  ]
})
export class InsuranceModule { }
