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
import { OfferCreatorComponent } from './offer_components/offer-creator/offer-creator.component';
import { FormCreatorComponent } from './offer_components/form-creator/form-creator.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { OfferManagerComponent } from './offer_components/offer-manager/offer-manager.component';
import { CategoryModalComponent } from './category_componenets/category-modal/category-modal.component';
import { ChatComponent } from './chat/chat.component';
import { OfferViewComponent } from './offer_components/offer-view/offer-view.component';
import { OfferDetailComponent } from './offer_components/offer-detail/offer-detail.component';
import { EditOfferComponent } from "./offer_components/edit-offer/edit-offer.component";
import { AppointmentComponent } from './appointments/appointment/appointment.component';
import { DbAgentComponent } from './appointments/db-agent/db-agent.component';
import { AppointmentManagerComponent } from './appointments/appointment-manager/appointment-manager.component';





@NgModule({
  declarations: [CategoryComponent, OfferCreatorComponent,
     FormCreatorComponent, OfferManagerComponent, CategoryModalComponent, ChatComponent, 
     OfferViewComponent, OfferDetailComponent,EditOfferComponent, AppointmentComponent, DbAgentComponent, AppointmentManagerComponent],
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
