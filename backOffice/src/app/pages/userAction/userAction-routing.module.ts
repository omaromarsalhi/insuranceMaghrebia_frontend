import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdvancedtableComponent} from './reports/advancedtable.component';
import {ReportDetailComponent} from './reportDetail/reportDetail.component';

const routes: Routes = [

    {
        path: 'showReport',
        component: AdvancedtableComponent
    },
    {
        path: 'saas/:id',
        component: ReportDetailComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserActionRoutingModule {
}
