import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbNavModule, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './paymentContract/payment.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '../shared/ui/ui.module';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { DecimalPipe } from '@angular/common';
import { PaymentUsPlanDetailsComponent } from './payment-us-plan-details/payment-us-plan-details.component';


@NgModule({
  declarations: [PaymentComponent, PaymentDetailsComponent, PaymentUsPlanDetailsComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbModalModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    NgbCollapseModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    UIModule,
    Ng2SmartTableModule,
    NgbTooltipModule


  ],
  providers: [DecimalPipe],
})
export class PaymentModule { }
