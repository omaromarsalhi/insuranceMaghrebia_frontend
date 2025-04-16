import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { MagnificPopupDirective } from './directives/magnific-popup.directive';
import { NiceSelectDirective } from './directives/nice-select.directive';
import { AnimationDirective } from './directives/animation.directive';
import { BackToTopComponent } from './shared/back-to-top/back-to-top.component';
import { CounterComponent } from './shared/counter/counter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { InsuranceModule } from './insurances/insurance.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
=======
import { PaymentComponent } from './payment/payment.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { CheckoutComponent } from './payment/checkout/checkout.component';
import { PopUpComponent } from './payment/utils/pop-up/pop-up.component';
import { PaymentContractsComponent } from './payment/payment-contracts/payment-contracts.component';
import { PaymentPlanDetailsComponent } from './payment/payment-plan-details/payment-plan-details.component';
import { ErrorPopUpComponent } from './payment/utils/error-pop-up/error-pop-up.component';
import { SignatureComponent } from './payment/signature/signature.component';
import { MatDialogModule } from '@angular/material/dialog';
import { WalletPaymentComponent } from './payment/wallet-payment/wallet-payment.component';
import { PaymentdetailsComponent } from './payment/paymentdetails/paymentdetails.component';

>>>>>>> payment_branch

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MagnificPopupDirective,
    NiceSelectDirective,
    AnimationDirective,
    BackToTopComponent,
    CounterComponent,
<<<<<<< HEAD
    HomeFooterComponent
=======
    PaymentComponent,
    CheckoutComponent,
    PopUpComponent,
    PaymentdetailsComponent,
    PaymentContractsComponent,
    PaymentPlanDetailsComponent,
    ErrorPopUpComponent,
    SignatureComponent,
    WalletPaymentComponent
>>>>>>> payment_branch
  ],
  imports: [
    BrowserModule,
    RouterModule,
<<<<<<< HEAD
    SlickCarouselModule, 
    AppRoutingModule, 
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    InsuranceModule
  
=======
    AppRoutingModule,
    SlickCarouselModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    NgxStripeModule.forRoot('pk_test_51QuEtGA3IRpOqAjD19y87vjYVjauMymaxNEA58EmVBTRSCutsQYZ5yXCtngEw0YQrnYepGyZ21pTV18M383fuNhM00KMjER1WJ'),

>>>>>>> payment_branch
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
