import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CamplaintComponent} from "./camplaint/camplaint.component";
import {ShowComplaintComponent} from "./show-complaint/show-complaint.component";
import {ResponseComplaintComponent} from "./response-complaint/response-complaint.component";

const routes: Routes = [

    {
        path: 'showComplaints',
        component: ShowComplaintComponent
    },
    {
        path: 'showResponse/:id',
        component:  ResponseComplaintComponent
    },
    {
        path: 'complaint',
        component: CamplaintComponent
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComplaintsRoutingModule {
}

