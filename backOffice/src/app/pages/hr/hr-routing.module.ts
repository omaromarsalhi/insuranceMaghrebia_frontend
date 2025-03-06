import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { OverviewJobComponent } from './overview-job/overview-job.component';
import { AddJobComponent } from './add-job/add-job.component';
import { InterviewsComponent } from './interviews/interviews.component';

const routes: Routes = [
  { path: 'jobs', component: JobsComponent },
  { path: 'job', component: OverviewJobComponent },
  { path: 'add-job', component: AddJobComponent },
  { path: 'interviews', component: InterviewsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
