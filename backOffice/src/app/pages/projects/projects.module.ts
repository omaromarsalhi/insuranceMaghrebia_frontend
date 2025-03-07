import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';


import { ShowResponsesComponent } from './overview/showResponses.component';


@NgModule({
  declarations: [ShowResponsesComponent],
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        UIModule,
        NgbDropdownModule,
        NgbTooltipModule,
        NgApexchartsModule,
        DropzoneModule,
        FormsModule,
        NgbDatepickerModule,
        ReactiveFormsModule
    ]
})

export class ProjectsModule { }
