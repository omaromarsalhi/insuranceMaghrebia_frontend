import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {LayoutComponent} from './layouts/layout.component';
import {CyptolandingComponent} from './cyptolanding/cyptolanding.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
        canActivate: [AuthGuard]
    },
    {path: 'crypto-ico-landing', component: CyptolandingComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
