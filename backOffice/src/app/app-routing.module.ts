import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { CategoryComponent } from './insurance/category_componenets/category/category.component';


const routes: Routes = [
  { path: 'insurance',component: LayoutComponent , loadChildren: () => import('./insurance/insurance.module').then(m => m.InsuranceModule) },
  { path: '',component: LayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
