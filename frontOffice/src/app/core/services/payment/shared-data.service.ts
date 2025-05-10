import { Injectable } from '@angular/core';
import { Payment } from '../../models/payment/Payments';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  selectedPayment: Payment | null = null;
  constructor() { }

  setSelectedPayment(payment: Payment): void {
    this.selectedPayment = payment;
  }

  getSelectedPayment(): Payment | null {
    return this.selectedPayment;
  }
}
