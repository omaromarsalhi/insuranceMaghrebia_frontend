import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {ChatComponent} from './chat/chat.component';
import {DefaultComponent} from './dashboards/default/default.component';


const routes: Routes = [
    {path: '', redirectTo: 'dashboard'},

    {path: 'dashboard', component: DefaultComponent},

    {path: 'chat', component: ChatComponent},

    {path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)},

    {path: 'crypto', loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule)},

    {path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)},

    {path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule)},
    {path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule)},
    {path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
    { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
    {path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule)},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
