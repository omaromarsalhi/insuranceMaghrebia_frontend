import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { PaymentContractsComponent } from './payment-contracts/payment-contracts.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentPlanDetailsComponent } from './payment-plan-details/payment-plan-details.component';
import { completeProfileGuard } from '../core/guards/complete-profile.guard';


const routes: Routes = [

  { path: 'payment/:offerId', component: PaymentComponent ,canActivate : [completeProfileGuard]},
  { path: 'payment-details/:userId', component: PaymentContractsComponent, canActivate : [completeProfileGuard] },
  { path: 'card/:totalAmount', component: CheckoutComponent, canActivate : [completeProfileGuard] },
  { path: 'paymentPlan/:contractPaymentId', component: PaymentPlanDetailsComponent, canActivate : [completeProfileGuard] },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
