import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'insurance', loadChildren: () => import('./insurances/insurance-routing.module').then(m => m.InsuranceRoutingModule) },
  { path: 'payments', loadChildren: () => import('./payment/payment-routing.module').then(m => m.PaymentRoutingModule) },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }