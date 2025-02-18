import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule , NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';
import { CategoryComponent } from './category/category.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { ParticularRoutingModule } from './particular-routing.module';



@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    ParticularRoutingModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    Ng2SearchPipeModule,
    SimplebarAngularModule,
    LightboxModule,
    UIModule
  ],
})
export class ParticularModule { }
