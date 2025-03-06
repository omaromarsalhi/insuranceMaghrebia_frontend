import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateIncidentPageComponent } from './create-incident-page/create-incident-page.component';
import { IncidentTypeListComponent } from './incident-type-list/incident-type-list.component';
import { ClaimsMapComponent } from './claims-map/claims-map.component';
import { ClaimsPageComponent } from './claims-page/claims-page.component';
import { ClaimDetailsPageComponent } from './claim-details-page/claim-details-page.component';


const routes: Routes = [
    {
        path: '',
        component: ClaimsPageComponent
    },
    {
        path: 'details/:id',
        component: ClaimDetailsPageComponent
    },
    {
        path: 'incident-type/create',
        component: CreateIncidentPageComponent
    },
    {
        path: 'incident-type/list',
        component: IncidentTypeListComponent
    },
    {
        path: 'map',
        component: ClaimsMapComponent
    },
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClaimsRoutingModule {}
