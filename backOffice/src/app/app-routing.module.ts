import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { PaymentComponent } from './payment/paymentContract/payment.component';


const routes: Routes = [
  {
    path: 'insurance',
    component: LayoutComponent,
    loadChildren: () => import('./insurance/insurance.module').then(m => m.InsuranceModule)
  },
  {
    path: 'payment',
    component: LayoutComponent,
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)
  },


  {
    path: '',
    component: LayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
