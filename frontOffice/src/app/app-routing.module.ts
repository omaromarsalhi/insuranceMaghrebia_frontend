import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './payment/checkout/checkout.component';
import { PaymentContractsComponent } from './payment/payment-contracts/payment-contracts.component';
import { PaymentPlanDetailsComponent } from './payment/payment-plan-details/payment-plan-details.component';
import { SignatureComponent } from './payment/signature/signature.component';


const routes: Routes = [
  { path: 'insurance', loadChildren: () => import('./insurances/insurance-routing.module').then(m => m.InsuranceRoutingModule) },
  { path: 'home', component: HomeComponent }, 
  { path: '', component: HomeComponent }, 
  { path: 'payment/:amount', component: PaymentComponent },
  { path: 'payment-details/:userId', component: PaymentContractsComponent },
  { path: 'card/:totalAmount', component: CheckoutComponent },
  { path: 'paymentPlan/:contractPaymentId', component: PaymentPlanDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }