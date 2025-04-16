import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentPlan } from 'src/app/core/models/offer/payment-plan';
import { PaymentPlanService } from 'src/app/core/services/payment/payment-plan.service';
import { Location } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  updatePayment(plan: PaymentPlan): void {
    // Add your logic to update the payment here
    console.log('Update Payment:', plan);
    // Example: Mark as paid
    // plan.paymentStatus = 'Paid';
    // You can also call a service to update the payment status in the backend
  }
}