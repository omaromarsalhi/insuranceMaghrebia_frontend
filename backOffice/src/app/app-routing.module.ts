import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layouts/layout.component';
import { PaymentComponent } from './payment/paymentContract/payment.component';

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  //{ path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},

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
