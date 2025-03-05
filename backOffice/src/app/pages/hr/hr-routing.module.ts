import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { OverviewJobComponent } from './overview-job/overview-job.component';
import { AddJobComponent } from './add-job/add-job.component';

const routes: Routes = [
      {path:'jobs',component: JobsComponent},
      {path:'candidates',component: CandidatesComponent},
      {path:'job',component: OverviewJobComponent},
      {path:'add-job',component: AddJobComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
