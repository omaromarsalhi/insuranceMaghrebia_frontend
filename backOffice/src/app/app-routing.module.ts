import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';


const routes: Routes = [
  { path: 'account', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'dashboard',component: LayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
