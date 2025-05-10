import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/core/models/payment/Payments';
import { SharedDataService } from 'src/app/core/services/payment/shared-data.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PaymentContractService } from 'src/app/core/services/payment/payment-contract.service';
@Component({
  selector: 'app-payment-contracts',
  templateUrl: './payment-contracts.component.html',
  styleUrls: ['./payment-contracts.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class PaymentContractsComponent implements OnInit {

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
    private router: Router,
    private actvRoute: ActivatedRoute,
    private paymentService: PaymentContractService
  ) { }

  ngOnInit(): void {
    this.userId = String(this.actvRoute.snapshot.paramMap.get('userId'));
    this._fetchData();
  }

  private _fetchData(): void {
    this.paymentService.getPaymentContracts(this.userId).subscribe({
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

  applyFilter(): void {
    this.filteredData = this.listData.filter((payment) =>
    (payment.contractPaymentId.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.statusFilter ? payment.paymentStatus === this.statusFilter : true)
    ));
    this.currentPage = 1;
    this.updatePagination();
  }


  resetFilters(): void {
    this.searchQuery = '';
    this.statusFilter = '';
    this.applyFilter();
  }


  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredData = this.filteredData.slice(startIndex, endIndex);
    this.hasMoreData = this.listData.length > endIndex;
  }


  viewDetails(payment: Payment): void {
    this.router.navigate(['/paymentPlan', payment.contractPaymentId]);
  }
  getPaymentProgress(payment: Payment): number {
    if (!payment.paymentPlans) return 0;

    const totalAmount = payment.paymentPlans.reduce((sum, plan) => sum + plan.amountDue, 0);
    const totalPaid = payment.paymentPlans.reduce((sum, plan) => sum + plan.amountPaid, 0);

    return Math.round((totalPaid / totalAmount) * 100);
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

  generatePDF(payment: any) {
    const doc = new jsPDF();

    const logoUrl = 'assets/images/logo/logo.png';
    doc.addImage(logoUrl, 'PNG', 10, 10, 50, 20);

    doc.setFontSize(16).setFont('helvetica', 'bold').text('Maghrebia Insurance', 70, 20);
    doc.setFontSize(10).setFont('helvetica', 'normal')
      .text('64, rue de Palestine 1002, Tunis', 70, 30)
      .text('Phone: +00 216 71 788 800  | Fax: 00 216 71 788 334', 70, 37);

    doc.setFontSize(18).setFont('helvetica', 'bold')
      .text(`Contract Details - ${payment.offerId} Insurance`, 10, 50);

    let yPosition = 65;
    doc.setFontSize(12).setFont('helvetica', 'normal')
      .text(`Full Name: ${payment.userId}`, 10, yPosition)
      .text(`Total Amount: $${payment.totalAmount}`, 10, yPosition + 10)
      .text(`Plan Duration: ${payment.planDuration}`, 10, yPosition + 20)
      .text(`Purchased at: ${this.formatDate(payment.contractCreatedAt)}`, 10, yPosition + 30);

    yPosition += 40;

    doc.setFontSize(14).setFont('helvetica', 'bold').text('Payment Plans:', 10, yPosition);
    yPosition += 10;

    const paymentPlans = payment.paymentPlans.map((plan: any, index: number) => [
      `Plan ${index + 1}`,
      `$${plan.amountDue}`,
      `$${plan.amountPaid}`,
      plan.paymentStatus,
      this.formatDate(plan.dueDate)
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [['Plan', 'Amount Due', 'Amount Paid', 'Status', 'Due Date']],
      body: paymentPlans,
      theme: 'striped',
      headStyles: { fillColor: '#193B1E' },
      columnStyles: {
        0: { fontStyle: 'bold' },
        4: { halign: 'right' }
      }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 20;
    doc.setFontSize(12).setFont('helvetica', 'bold').text('Terms and Conditions:', 10, yPosition);
    yPosition += 5;

    const terms = [
      '1. **Monthly Service Charge**:',
      '   - If the full balance is not paid by the due date, a monthly service charge will be applied to the remaining unpaid amount.',
      '   - The service charge will be calculated as 3% of the outstanding balance if the payment is more than one month overdue.',
      '          ',
      '2. **Total Payment for Services**:',
      '   - The client agrees to pay Maghrebia a total sum of the total amount for the purchased package , in accordance with the terms outlined in this agreement.',
      '          ',
      '3. **Delinquent Payments and Default**:',
      '   - Payments not received by the due date will be considered delinquent.',
      '   - If a payment becomes delinquent, the agreement may be considered in default, and the full remaining balance, including penalties and interest, will become due immediately.'
    ];


    terms.forEach(term => {
      doc.setFont('helvetica', 'normal').text(term, 10, yPosition, { maxWidth: 180 });
      yPosition += 10;
    });

    yPosition += 5;
    doc.setFontSize(14).setFont('helvetica', 'bold').text('Signature:', 10, yPosition);
    yPosition += 5;
    doc.setLineWidth(0.5).line(10, yPosition, 80, yPosition);
    yPosition += 18;
    doc.setFontSize(10).setTextColor(100)
      .text('© 2015 Maghrebia Insurance. All rights reserved.', 120, yPosition)

    doc.save(`Contract_${payment.contractPaymentId}.pdf`);
  }
  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

}