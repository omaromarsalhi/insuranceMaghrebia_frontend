import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';
import { BlockEntryGuard } from '../core/guards/block-entry.guard';
import { CompleteProfileGuard } from '../core/guards/complete-profile.guard';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
 
  { path: 'dashboard', component: DefaultComponent , canActivate: [BlockEntryGuard,CompleteProfileGuard]},
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) , canActivate: [BlockEntryGuard,CompleteProfileGuard]},
  { path: 'account', loadChildren: () => import('./user/account/account.module').then(m => m.AccountModule) , canActivate: [BlockEntryGuard] },
  { path: 'user', loadChildren: () => import('./user/list/list.module').then(m => m.ListModule) , canActivate: [BlockEntryGuard,CompleteProfileGuard] },
  { path: 'hr', loadChildren: () => import('./hr/hr.module').then(m => m.HrModule) , canActivate: [BlockEntryGuard,CompleteProfileGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
