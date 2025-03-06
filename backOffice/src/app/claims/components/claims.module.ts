import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from '../../shared/ui/ui.module';

import { UiSwitchModule } from 'ngx-ui-switch';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule, NgbDatepickerModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateIncidentPageComponent } from './create-incident-page/create-incident-page.component';
import { ClaimsRoutingModule } from './claims-routing.module';
import { IncidentTypeListComponent } from './incident-type-list/incident-type-list.component';
import { ClaimsMapComponent } from './claims-map/claims-map.component';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ClaimsPageComponent } from './claims-page/claims-page.component';
import { ClaimDetailsPageComponent } from './claim-details-page/claim-details-page.component';



@NgModule({
  declarations: [CreateIncidentPageComponent, IncidentTypeListComponent, ClaimsMapComponent, ClaimsPageComponent, ClaimDetailsPageComponent],
  imports: [
    NgbAlertModule,
    NgbNavModule,
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
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    }),
    LeafletModule
  ]
})

export class ClaimsModule { }
