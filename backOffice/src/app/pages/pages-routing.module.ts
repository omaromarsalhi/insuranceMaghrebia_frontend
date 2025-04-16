import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from './dashboards/default/default.component';


const routes: Routes = [
    {path: '', redirectTo: 'dashboard'},
    {path: 'dashboard', component: DefaultComponent},
     {path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)},
    {path: 'listComplaints', loadChildren: () => import('./complaint/complaint.module').then(m => m.ComplaintModule)},
    {path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule)},
    {path: 'report', loadChildren: () => import('./userAction/userAction.module').then(m => m.UserActionModule) },
    { path: 'show', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
