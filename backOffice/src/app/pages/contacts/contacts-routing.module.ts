import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsergridComponent} from './listComplaint/usergrid.component';

const routes: Routes = [
    {
        path: 'grid',
        component: UsergridComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactsRoutingModule {
}
