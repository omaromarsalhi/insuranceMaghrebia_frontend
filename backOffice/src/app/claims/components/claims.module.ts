import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from '../../shared/ui/ui.module';

import { UiSwitchModule } from 'ngx-ui-switch';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateIncidentPageComponent } from './create-incident-page/create-incident-page.component';
import { ClaimsRoutingModule } from './claims-routing.module';
import { IncidentTypeListComponent } from './incident-type-list/incident-type-list.component';


@NgModule({
  declarations: [CreateIncidentPageComponent, IncidentTypeListComponent],
  imports: [
    NgbAlertModule,
    CommonModule,
    ClaimsRoutingModule,
    UIModule,
    UiSwitchModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgApexchartsModule,
    DropzoneModule,
    FormsModule,
    NgbDatepickerModule,
    ReactiveFormsModule
  ]
})

export class ClaimsModule { }
