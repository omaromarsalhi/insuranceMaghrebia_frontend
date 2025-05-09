import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComplaitComponent} from '../complaint/listComplaint/listComplait.component';

const routes: Routes = [
    {
        path: 'list',
        component: ListComplaitComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComplaintRoutingModule {
}
