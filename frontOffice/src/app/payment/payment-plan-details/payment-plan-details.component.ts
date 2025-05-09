import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/core/models/payment/Payments';
import { PaymentPlan } from 'src/app/core/models/payment/PaymentsPlan';
import { PaymentPlanService } from 'src/app/core/services/payment-plan.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { WalletService } from 'src/app/core/services/wallet.service';
import { MatDialog } from '@angular/material/dialog';
import { WalletPaymentComponent } from '../wallet-payment/wallet-payment.component';

@Component({
  selector: 'app-payment-plan-details',
  templateUrl: './payment-plan-details.component.html',
  styleUrls: ['./payment-plan-details.component.css']
})
export class PaymentPlanDetailsComponent implements OnInit {

  paymentPlans: PaymentPlan[] = [];
  contractPaymentId!: string;
  selectedPlanForPayment: PaymentPlan | null = null;
  selectedMethod: string | null = null;
  walletBalance!: number;
  showWalletPanel: boolean = false;
  isWalletDialogOpen = false;
  isLoading: boolean = true;
  walletId!: string;
  isButtonVisible = false;



  constructor(
    private paymentPlanService: PaymentPlanService,
    private router: Router,
    private route: ActivatedRoute,
    private walletService: WalletService,
    public dialog: MatDialog,


  ) { }

  ngOnInit(): void {
    this.contractPaymentId = this.route.snapshot.paramMap.get('contractPaymentId')!;
    this.fetchPaymentDetails();
    console.log(this.contractPaymentId)
  }
  cancelPayment() {
    this.selectedPlanForPayment = null;
  }

  showPaymentOptions(plan: PaymentPlan) {
    this.selectedPlanForPayment = plan;
  }
  private fetchPaymentDetails(): void {
    this.paymentPlanService.getPaymentPlans(this.contractPaymentId).subscribe({
      next: (data: PaymentPlan[]) => {
        this.paymentPlans = data;
      },
      error: (error) => {
        console.error('Error fetching payment plans:', error);
      }
    });
  }
  navigateToCheckout(paymentPlan: PaymentPlan, method: 'card' | 'wallet') {
    if (this.isWalletDialogOpen) {
      return;
    }

    this.selectedMethod = this.selectedMethod === method ? null : method;
    console.log("the selected emthode is :", method)
    this.isButtonVisible = (method === 'card' && this.selectedMethod === 'card');


    this.router.navigate([`/card/${paymentPlan.amountDue}`], {
      queryParams: {
        type: 'plan',
        planId: paymentPlan.paymentPlanId,
      }
    });
  }
  // async openWalletModal(paymentPlan: PaymentPlan) {
  //   this.isButtonVisible = false;

  //   this.selectedMethod = 'wallet';
  //   this.isWalletDialogOpen = true;
  //   const result = await this.loadWalletData("lokdtglvvf");
  //   console.log(result)


  //   const dialogRef = this.dialog.open(WalletPaymentComponent, {
  //     width: '450px',
  //     position: {
  //       top: '150px',
  //       left: '1000px'
  //     },
  //     panelClass: 'centered-dialog',
  //     data: {
  //       paymentAmount: paymentPlan.amountDue,
  //       walletBalance: this.walletBalance,
  //       walletId: this.walletId,
  //       planDuration: paymentPlan.dueDate,
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.selectedMethod = null;
  //     this.isButtonVisible = false;
  //     this.isWalletDialogOpen = false;
  //     console.log("the selecteed methode equals to :", this.selectedMethod)
  //     if (result) this.processWalletPayment();
  //   });
  // }
  async openWalletModal(paymentPlan: PaymentPlan) {
    this.isButtonVisible = false;
    this.selectedMethod = 'wallet';
    this.isWalletDialogOpen = true;

    try {

      const userId = "user_4444";
      await this.loadWalletData(userId);

      const dialogRef = this.dialog.open(WalletPaymentComponent, {
        width: '450px',
        position: {
          top: '150px',
          right: '50px'
        },
        panelClass: 'centered-dialog',
        data: {
          paymentAmount: paymentPlan.amountDue,
          walletBalance: this.walletBalance,
          walletId: this.walletId,
          planDuration: paymentPlan.dueDate,
          paymentPlanId: paymentPlan.paymentPlanId,
          isExistingPayment: paymentPlan.paymentPlanId !== undefined,
          paymentType: 'plan'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.selectedMethod = null;
        this.isButtonVisible = false;
        this.isWalletDialogOpen = false;
        if (result) {
          this.processWalletPayment();
        }
      });
    } catch (error) {
      console.error('Failed to load wallet data:', error);
      this.isWalletDialogOpen = false;
      // Show error message to user
    }
  }
  private loadWalletData(userid: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.isLoading = true;
      this.walletService.getOne(userid, false).subscribe({
        next: (walletResponse) => {
          this.walletBalance = walletResponse.balance;
          this.walletId = walletResponse.walletId;
          console.log("wallet responsee ", walletResponse)
          console.log("wallet wallet IDe ", walletResponse.walletId)

          this.isLoading = false;
          resolve();
        },
        error: (err) => {
          this.isLoading = false;
          reject(err);
        }
      });
    });
  }

  processWalletPayment() {
    console.log('Processing wallet payment...');
  }


  // selectPayment(method: 'card' | 'wallet') {
  //   if (this.isWalletDialogOpen) {
  //     return;
  //   }

  //   this.selectedMethod = this.selectedMethod === method ? null : method;
  //   console.log("the selected emthode is :", method)
  //   this.isButtonVisible = (method === 'card' && this.selectedMethod === 'card');


  // }

  // proceedToPayment() {

  //   if (this.selectedMethod === 'card') {
  //     this.router.navigate(['/card-payment']);
  //   }
  // }
  // navigateToCheckout(plan: PaymentPlan, paymentMethod: string) {
  //   if (paymentMethod === 'card') {
  //     this.router.navigate([`/card/${plan.amountDue}`], {
  //       queryParams: {
  //         type: 'plan',
  //         planId: plan.paymentPlanId,
  //       }
  //     });
  //   } else if (paymentMethod === 'wallet') {
  //     this.router.navigate(['/wallet-payment'], {
  //       queryParams: {
  //         amount: plan.amountDue,
  //         type: 'plan',
  //         planId: plan.paymentPlanId,
  //       }
  //     });
  //   }
  //   this.selectedPlanForPayment = null;
  // }
  getOverallProgress(): number {
    if (!this.paymentPlans || !this.paymentPlans) return 0;

    const totalAmount = this.paymentPlans.reduce((sum, plan) => sum + plan.amountDue, 0);
    const totalPaid = this.paymentPlans.reduce((sum, plan) => sum + plan.amountPaid, 0);

    return Math.round((totalPaid / totalAmount) * 100);
  }

  getPlanProgress(plan: PaymentPlan): number {
    const amountDue = plan.amountDue || 0;
    const amountPaid = plan.amountPaid || 0;
    return Math.round((amountPaid / amountDue) * 100);
  }
  getTotalAmount(): number {
    if (!this.paymentPlans || this.paymentPlans.length === 0) return 0;
    return this.paymentPlans.reduce((sum, plan) => sum + (plan.amountDue || 0), 0);
  }

  getPlanDuration(): string {
    return '12 months';
  }

  getOverallStatus(): string {
    if (!this.paymentPlans || this.paymentPlans.length === 0) return 'N/A';

    const allPaid = this.paymentPlans.every(plan => plan.paymentStatus === 'Paid');
    const anyPending = this.paymentPlans.some(plan => plan.paymentStatus === 'Pending');
    const anyOverdue = this.paymentPlans.some(plan => plan.paymentStatus === 'Overdue');

    if (allPaid) return 'Paid';
    if (anyOverdue) return 'Overdue';
    if (anyPending) return 'Pending';
    return 'N/A';
  }

}
