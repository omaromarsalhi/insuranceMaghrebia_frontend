import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { PaymentContractsComponent } from './payment-contracts/payment-contracts.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentPlanDetailsComponent } from './payment-plan-details/payment-plan-details.component';


const routes: Routes = [

  { path: 'payment/:offerId', component: PaymentComponent },
  { path: 'payment-details/:userId', component: PaymentContractsComponent },
  { path: 'card/:totalAmount', component: CheckoutComponent },
  { path: 'paymentPlan/:contractPaymentId', component: PaymentPlanDetailsComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
