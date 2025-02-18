import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticularRoutingModule } from './particular-routing.module';
import { OfferDtailsComponent } from './offer-dtails/offer-dtails.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [
    CategoryComponent,
    OfferDtailsComponent
  ],
  imports: [
    CommonModule,
    ParticularRoutingModule,
    SharedModule
  ]
})
export class ParticularModule { }
