// payment.component.ts
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from 'src/app/core/models/payment/payment';
import { PaymentSortableService, SortEvent } from '../payment-sortable.directive';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { DecimalPipe } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [PaymentService, DecimalPipe, DatePipe]
})
export class PaymentComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  metrics = {
    todayCount: 0,
    completedAmount: 0,
    pendingCount: 0,
    overdueCount: 0,
    overdueAmount: 0
  };

  paymentData: Payment[];
  payments$: Observable<Payment[]>;
  public selected: any;
  hideme: boolean[] = [];
  total$: Observable<number>;
  @ViewChildren(PaymentSortableService) headers: QueryList<PaymentSortableService>;


  constructor(
    public service: PaymentService,
    private datePipe: DatePipe) {
    this.payments$ = service.payment$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Payment table', active: true }];
    this.loadMetricsOptimized();
    this._fetchData();
  }

  loadMetricsOptimized(): void {
    this.service.getPayments().subscribe(payments => {
      const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      const now = new Date();

      this.metrics = {
        todayCount: payments.filter(p =>
          this.datePipe.transform(p.contractCreatedAt, 'yyyy-MM-dd') === today
        ).length,
        completedAmount: payments
          .filter(p => p.paymentStatus === 'Paid')
          .reduce((sum, p) => sum + p.totalAmount, 0),
        pendingCount: payments.filter(p => p.paymentStatus === 'Pending').length,
        overdueCount: payments.filter(p => p.paymentStatus === 'Overdue').length,
        overdueAmount: payments
          .filter(p => p.paymentStatus === 'Overdue')
          .reduce((sum, p) => sum + p.totalAmount, 0)
      };
    });
  }

  refreshMetrics(): void {
    this.metrics = {
      todayCount: 0,
      completedAmount: 0,
      pendingCount: 0,
      overdueCount: 0,
      overdueAmount: 0
    };
    this.loadMetricsOptimized();
  }

  changeValue(i) {
    this.hideme[i] = !this.hideme[i];
  }

  _fetchData() {
    this.service.getPayments().subscribe((data: Payment[]) => {
      this.paymentData = data;
      this.hideme = new Array(this.paymentData.length).fill(true);
    });
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}