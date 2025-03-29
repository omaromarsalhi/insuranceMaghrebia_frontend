import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './paymentContract/payment.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentUsPlanDetailsComponent } from './payment-us-plan-details/payment-us-plan-details.component';

const routes: Routes = [
  { path: 'contract', component: PaymentComponent },
  { path: 'details/:userId', component: PaymentDetailsComponent },
  { path: 'paymentPlan/:id', component: PaymentUsPlanDetailsComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
