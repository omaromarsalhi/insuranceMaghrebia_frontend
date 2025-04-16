import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
<<<<<<< HEAD
import { CategoryComponent } from './insurance/category_componenets/category/category.component';


const routes: Routes = [
  { path: 'insurance',component: LayoutComponent , loadChildren: () => import('./insurance/insurance.module').then(m => m.InsuranceModule) },
  { path: '',component: LayoutComponent}
=======
import { CategoryComponent } from './insurance/particular/category/category.component';
import { PaymentComponent } from './payment/paymentContract/payment.component';


const routes: Routes = [
  {
    path: 'category',
    component: CategoryComponent
  },
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
>>>>>>> payment_branch
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
