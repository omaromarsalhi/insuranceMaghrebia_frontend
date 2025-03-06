import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { JobsComponent } from './jobs/jobs.component';
import { UIModule } from "../../shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { OverviewJobComponent } from './overview-job/overview-job.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddJobComponent } from './add-job/add-job.component';
import { InterviewsComponent } from './interviews/interviews.component';


@NgModule({
  declarations: [
    JobsComponent,
    OverviewJobComponent,
    AddJobComponent,
    InterviewsComponent
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    UIModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbTooltipModule,
    NgbAlertModule,
    NgSelectModule
  ]
})
export class HrModule { }
