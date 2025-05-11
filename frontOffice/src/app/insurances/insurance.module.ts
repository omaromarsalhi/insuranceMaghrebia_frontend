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
import { OffersListComponent } from './offer-componenets/offers-list/offers-list.component';
import { GenerateQuoteComponent } from './offer-componenets/generate-quote/generate-quote.component';
import { FormBuilderComponent } from './offer-componenets/form-builder/form-builder.component';
import { MapComponent } from './map/map.component';
import { QuoteAppointmentComponent } from './offer-componenets/quote-appointment/quote-appointment.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { BillingPeriodPipe } from './pipes/billing-period.pipe';
import { PaymentModule } from '../payment/payment.module';

@NgModule({
  declarations: [
    CategoryComponent,
    OfferDtailsComponent,
    PurshasedOfferComponent,
    OffersListComponent,
    GenerateQuoteComponent,
    FormBuilderComponent,
    MapComponent,
    QuoteAppointmentComponent,
    TruncatePipe,
    BillingPeriodPipe
  ],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    SharedModule,
    SlickCarouselModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    PaymentModule
  ],
})
export class InsuranceModule {}
