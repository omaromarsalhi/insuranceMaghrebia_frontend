import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.css']
})
export class PaymentdetailsComponent {

  settlements = [
    { title: 'First Settlement', dueDate: '2025-03-01', amount: 100, icon: 'fa fa-calendar-alt' },
    { title: 'Second Settlement', dueDate: '2025-06-01', amount: 200, icon: 'fa fa-credit-card' },
    { title: 'Final Settlement', dueDate: '2025-12-01', amount: 300, icon: 'fa fa-check-circle' }
  ];
  constructor(private router: Router) { }

  proceedToPayment() {
    console.log("Redirecting to payment...");
    // Replace this with your actual payment logic or routing
    this.router.navigate(['/payment']);
  }

}
