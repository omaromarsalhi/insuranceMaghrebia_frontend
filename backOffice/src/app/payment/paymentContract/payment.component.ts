import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from 'src/app/core/models/payment';
import { PaymentSortableService, SortEvent } from '../payment-sortable.directive';
import { PaymentService } from 'src/app/core/services/payment.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [PaymentService, DecimalPipe]
})
export class PaymentComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  paymentData: Payment[];
  payments$: Observable<Payment[]>;
  public selected: any;
  hideme: boolean[] = [];
  total$: Observable<number>;
  @ViewChildren(PaymentSortableService) headers: QueryList<PaymentSortableService>;


  constructor(public service: PaymentService) {
    this.payments$ = service.payment$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Payment table', active: true }];

    this._fetchData();

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

  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
  onSort({ column, direction }: SortEvent) {
    // Reset other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
