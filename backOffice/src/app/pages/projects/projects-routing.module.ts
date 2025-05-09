import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShowResponsesComponent} from './overview/showResponses.component';


const routes: Routes = [
    {
        path: 'responses',
        component: ShowResponsesComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
