import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentContractService } from '../core/services/payment-contract.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopUpComponent } from './utils/pop-up/pop-up.component';
import { ErrorPopUpComponent } from './utils/error-pop-up/error-pop-up.component';
import { WalletPaymentComponent } from './wallet-payment/wallet-payment.component';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { WalletService } from '../core/services/wallet.service';
import { PaymentMethod } from '../core/models/payment/paymentMethod';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  totalAmount!: number;
  selectedMethod: string | null = null;
  walletBalance!: number;
  showWalletPanel: boolean = false;
  isWalletDialogOpen = false;
  isLoading: boolean = true;
  walletId!: string;
  isButtonVisible = false;


  constructor(
    private paymentformBuilder: FormBuilder,
    private paymentService: PaymentContractService,
    private router: Router,
    private actvRoute: ActivatedRoute,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private overlay: Overlay,
    private walletService: WalletService
  ) { }

  ngOnInit(): void {
    const amount = this.actvRoute.snapshot.paramMap.get('amount');
    if (amount !== null) {
      this.totalAmount = Number(amount);
    } else {
      console.error('Amount parameter is missing in the URL.');
      this.totalAmount = 0;
    }
    this.initializeForm();
  }

  private initializeForm(): void {
    this.paymentForm = this.paymentformBuilder.group({
      userId: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[A-Za-z ]+$')
      ]],

      offerId: ['', [Validators.required]],
      planDuration: ['', [Validators.required]],
    });
  }

  // private async loadWalletData(userid: String) {
  //   this.isLoading = true;
  //   this.walletService.getOne(userid, false).subscribe({
  //     next: (walletResponse) => {
  //       this.walletBalance = walletResponse.balance;
  //       console.log("the balance inside the load = ", this.walletBalance)
  //     },
  //     error: (err) => {
  //       console.error('Failed to load wallet:', err);
  //       this.isLoading = false;
  //     }
  //   });
  // }
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

  async openWalletModal() {
    this.isButtonVisible = false;
    if (this.paymentForm.invalid) {
      this.onPaymentPopUp("Fields Requirement", "Please fill all the required fields!");
      return;
    }
    this.selectedMethod = 'wallet';
    this.isWalletDialogOpen = true;
    await this.loadWalletData("user_4444");
    const dialogRef = this.dialog.open(WalletPaymentComponent, {
      width: '450px',
      position: {
        top: '150px',
        left: '1000px'
      },
      panelClass: 'centered-dialog',
      data: {
        paymentAmount: this.totalAmount,
        walletBalance: this.walletBalance,
        walletId: this.walletId,
        planDuration: this.paymentForm.get('planDuration')?.value,
        offerId: this.paymentForm.get('offerId')?.value,
        userId: this.paymentForm.get('userId')?.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedMethod = null;
      this.isButtonVisible = false;
      this.isWalletDialogOpen = false;
      console.log("the selecteed methode equals to :", this.selectedMethod)
      if (result) this.processWalletPayment();
    });
  }

  processWalletPayment() {
    console.log('Processing wallet payment...');
  }

  // selectPayment(method: 'card' | 'wallet') {
  //   this.selectedMethod = this.selectedMethod === method ? null : method;

  //   if (method === 'card' && this.selectedMethod === 'card') {
  //     this.selectedMethod = 'card';
  //     if (this.isWalletDialogOpen) {
  //       this.dialog.closeAll();
  //       this.isWalletDialogOpen = false;
  //     }
  //   }
  // }

  selectPayment(method: 'card' | 'wallet') {
    if (this.isWalletDialogOpen) {
      return;
    }

    this.selectedMethod = this.selectedMethod === method ? null : method;
    console.log("the selected emthode is :", method)
    this.isButtonVisible = (method === 'card' && this.selectedMethod === 'card');


  }

  proceedToPayment() {

    if (this.selectedMethod === 'card') {
      this.router.navigate(['/card-payment']);
    }
  }
  savePayment() {
    if (this.paymentForm.invalid) {
      this.onPaymentPopUp("Fields Requirement", "Please fill all the required fields!");
      return;
    }

    const paymentData = {
      ...this.paymentForm.value,
      totalAmount: this.totalAmount,
    };
    this.paymentService.post(
      paymentData,
      PaymentMethod.WALLET).subscribe(
        (response: any) => {
          const paymentContractId = response.contractPaymentId;
          this.router.navigate([`/card/${this.totalAmount}`], {
            queryParams: {
              type: 'contract',
              planId: paymentContractId,
            }
          });
        },
        (error) => {
          console.error('Error creating payment contract:', error);
          this.onPaymentPopUp("Payment Failed", "Failed to proeed. Please try again!");
        }
      );
  }

  onPaymentPopUp(Title: string, Messages: string) {
    const modalRef = this.modalService.open(ErrorPopUpComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.title = Title;
    modalRef.componentInstance.message = Messages;
  }

  get userId() { return this.paymentForm.get('userId'); }
  get offerId() { return this.paymentForm.get('offerId'); }
  get planDuration() { return this.paymentForm.get('planDuration'); }
}