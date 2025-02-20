import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateIncidentPageComponent } from './create-incident-page/create-incident-page.component';
import { IncidentTypeListComponent } from './incident-type-list/incident-type-list.component';


const routes: Routes = [
    {
        path: 'incident-type/create',
        component: CreateIncidentPageComponent
    },
    {
        path: 'incident-type/list',
        component: IncidentTypeListComponent
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClaimsRoutingModule {}
