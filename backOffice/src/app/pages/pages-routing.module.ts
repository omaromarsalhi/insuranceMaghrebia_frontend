import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockEntryGuard } from '../core/guards/block-entry.guard';
import { CompleteProfileGuard } from '../core/guards/complete-profile.guard';


const routes: Routes = [
  { path: 'account', loadChildren: () => import('./user/account/account.module').then(m => m.AccountModule) , canActivate: [BlockEntryGuard] },
  { path: 'user', loadChildren: () => import('./user/list/list.module').then(m => m.ListModule) , canActivate: [BlockEntryGuard,CompleteProfileGuard] },
  { path: 'hr', loadChildren: () => import('./hr/hr.module').then(m => m.HrModule) , canActivate: [BlockEntryGuard,CompleteProfileGuard] },
  { path: 'claims', loadChildren: () => import('../claims/components/claims.module').then(m => m.ClaimsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
