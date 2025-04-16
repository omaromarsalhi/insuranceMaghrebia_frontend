import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PopUpComponent } from './utils/pop-up/pop-up.component';
import { PaymentdetailsComponent } from './paymentdetails/paymentdetails.component';
import { PaymentContractsComponent } from './payment-contracts/payment-contracts.component';
import { PaymentPlanDetailsComponent } from './payment-plan-details/payment-plan-details.component';
import { ErrorPopUpComponent } from './utils/error-pop-up/error-pop-up.component';
import { SignatureComponent } from './signature/signature.component';
import { WalletPaymentComponent } from './wallet-payment/wallet-payment.component';



@NgModule({
  declarations: [
      PaymentComponent,
      CheckoutComponent,
      PopUpComponent,
      PaymentdetailsComponent,
      PaymentContractsComponent,
      PaymentPlanDetailsComponent,
      ErrorPopUpComponent,
      SignatureComponent,
      WalletPaymentComponent
    ],
     imports: [
        CommonModule,
        SharedModule,
        SlickCarouselModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule,
      ],
})
export class PaymentModule { }