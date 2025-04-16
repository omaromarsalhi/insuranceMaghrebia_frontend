import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentPlanService } from 'src/app/core/services/payment/payment-plan.service';
import { Location } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentPlan } from 'src/app/core/models/payment/payment-plan';

@Component({
  selector: 'app-payment-us-plan-details',
  templateUrl: './payment-us-plan-details.component.html',
  styleUrls: ['./payment-us-plan-details.component.scss']
})
export class PaymentUsPlanDetailsComponent {

  @Input() paymentPlans: PaymentPlan[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private paymentPlanService: PaymentPlanService,
    private location: Location,
    public activeModal: NgbActiveModal

  ) { }
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'status-paid';
      case 'pending':
        return 'status-pending';
      case 'overdue':
        return 'status-overdue';
      default:
        return '';
    }
  }
  closeModal(): void {
    this.activeModal.close(); // Close the modal
  }

}