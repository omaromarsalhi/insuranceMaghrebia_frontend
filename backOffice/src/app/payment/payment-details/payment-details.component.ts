import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/core/models/payment/payment';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentUsPlanDetailsComponent } from '../payment-us-plan-details/payment-us-plan-details.component';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  listData: Payment[] = [];
  filteredData: Payment[] = [];
  searchQuery: string = '';
  statusFilter: string = '';
  statusOptions: string[] = ['Paid', 'Pending', 'Overdue'];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  hasMoreData: boolean = true;
  userId!: string;



  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private actvRoute: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.userId = String(this.actvRoute.snapshot.paramMap.get('userId'));
    this.breadCrumbItems = [
      { label: 'Payment Contract ' },
      { label: 'Contract  List', active: true }
    ];

    // Fetch payment data
    this._fetchData();
  }

  /**
   * Fetches the payment list data
   */
  private _fetchData(): void {
    this.paymentService.getPayments().subscribe({
      next: (data: Payment[]) => {
        this.listData = data;
        this.filteredData = data;
        this.updatePagination();
      },
      error: (error) => {
        console.error('Error fetching payments:', error);
      }
    });
  }

  /**
   * Applies filters based on search query and status
   */
  applyFilter(): void {
    this.filteredData = this.listData.filter((payment) =>
    (payment.offerId.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.statusFilter ? payment.paymentStatus === this.statusFilter : true)
    ));
    this.currentPage = 1; // Reset to the first page after filtering
    this.updatePagination();
  }

  /**
   * Resets all filters
   */
  resetFilters(): void {
    this.searchQuery = '';
    this.statusFilter = '';
    this.applyFilter();
  }

  /**
   * Updates pagination and checks if more data is available
   */
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredData = this.filteredData.slice(startIndex, endIndex);
    this.hasMoreData = this.listData.length > endIndex;
  }

  /**
   * Loads more data for pagination
   */
  loadMore(): void {
    this.currentPage++;
    this.updatePagination();
  }

  /**
   * Navigates to the detailed view of a payment
   * @param payment - The selected payment
   */
  viewDetails(payment: Payment): void {
    console.log('View Details:', payment);
    const modalRef = this.modalService.open(PaymentUsPlanDetailsComponent, { size: 'md' });
    modalRef.componentInstance.paymentPlans = payment.paymentPlans;
  }

  markAsPaid(payment: Payment): void {
    payment.paymentStatus = 'Paid';
    // this.paymentService.updatePayment(payment).subscribe({
    //   next: () => {
    //     console.log('Payment marked as paid:', payment);
    //   },
    //   error: (error) => {
    //     console.error('Error updating payment:', error);
    //   }
    // });
  }

  getPhotoUrl(offerId: string | undefined): string {
    switch (offerId) {
      case 'car':
        return 'assets/images/icon/icon-2.png';
      case 'health':
        return 'assets/images/icon/icon-3.png';
      case 'house':
        return 'assets/images/icon/icon-1.png';
      case 'travel':
        return 'assets/images/icon/icon-4.png';
      case 'business':
        return 'assets/images/icon/icon-5.png';
      case 'agri':
        return 'assets/images/icon/icon-6.png';
      default:
        return 'assets/images/icon/default-icon.png';
    }
  }
}