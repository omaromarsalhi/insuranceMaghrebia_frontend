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
import { ArchwizardModule } from 'angular-archwizard';

import { InsuranceRoutingModule } from "./insurance-routing.module";
import { CategoryComponent } from "./category_componenets/category/category.component";
import { Ng5SliderModule } from "ng5-slider";
import { OfferCreatorComponent } from './offer_componenets/offer-creator/offer-creator.component';
import { FormCreatorComponent } from './offer_componenets/form-creator/form-creator.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { OfferManagerComponent } from './offer_componenets/offer-manager/offer-manager.component';
import { CategoryModalComponent } from './category_componenets/category-modal/category-modal.component';
import { ChatComponent } from './chat/chat.component';





@NgModule({
  declarations: [CategoryComponent, OfferCreatorComponent,
     FormCreatorComponent, OfferManagerComponent, CategoryModalComponent, ChatComponent],
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
    ArchwizardModule
  ],
})
export class InsuranceModule {}
