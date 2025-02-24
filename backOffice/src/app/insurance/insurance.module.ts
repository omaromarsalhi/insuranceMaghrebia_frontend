import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
  NgbNavModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbTooltipModule,
  NgbCollapseModule,
  NgbPaginationModule,
  NgbAccordionModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgApexchartsModule } from "ng-apexcharts";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { FullCalendarModule } from "@fullcalendar/angular";
import { SimplebarAngularModule } from "simplebar-angular";
import { LightboxModule } from "ngx-lightbox";
import { UIModule } from "src/app/shared/ui/ui.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InsuranceRoutingModule } from "./insurance-routing.module";
import { CategoryComponent } from "./category/category.component";
import { Ng5SliderModule } from "ng5-slider";
import { OfferCreatorComponent } from './offer-creator/offer-creator.component';
import { FormCreatorComponent } from './form-creator/form-creator.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { OfferManagerComponent } from './offer-manager/offer-manager.component';
import { CategoryFilterPipe } from "../pipes/category-filter.pipe";
import { PipesModule } from "../pipes/pipes.module";



@NgModule({
  declarations: [CategoryComponent, OfferCreatorComponent, FormCreatorComponent, OfferManagerComponent],
  imports: [
    InsuranceRoutingModule,
    CommonModule,
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
    UIModule,
    NgbPaginationModule,
    Ng5SliderModule,
    DragDropModule,
    NgbAccordionModule,
    NgbModule,
    PipesModule
  ],
})
export class InsuranceModule {}
