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
} from "@ng-bootstrap/ng-bootstrap";
import { NgApexchartsModule } from "ng-apexcharts";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { FullCalendarModule } from "@fullcalendar/angular";
import { SimplebarAngularModule } from "simplebar-angular";
import { LightboxModule } from "ngx-lightbox";
import { UIModule } from "src/app/shared/ui/ui.module";

import { InsuranceRoutingModule } from "./insurance-routing.module";
import { CategoryComponent } from "./category/category.component";
import { OfferComponent } from './offer/offer.component';
import { Ng5SliderModule } from "ng5-slider";
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { AddOfferComponent } from './add-offer/add-offer.component';


@NgModule({
  declarations: [CategoryComponent, OfferComponent, OfferDetailsComponent, AddOfferComponent],
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
  ],
})
export class InsuranceModule {}
