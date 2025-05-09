import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaymentContractResponse } from 'src/app/core/models/payment/PaymentContractResponse';
import { PaymentMethod } from 'src/app/core/models/payment/paymentMethod';
import { TransactionType } from 'src/app/core/models/wallet/TransactionType';
import { WalletRequest } from 'src/app/core/models/wallet/WalletRequest';
import { PaymentContractService } from 'src/app/core/services/payment-contract.service';
import { WalletService } from 'src/app/core/services/wallet.service';
import { lastValueFrom } from 'rxjs';
import { error } from 'jquery';
import { PaymentPlanService } from 'src/app/core/services/payment-plan.service';
@Component({
  selector: 'app-wallet-payment',
  templateUrl: './wallet-payment.component.html',
  styleUrls: ['./wallet-payment.component.css']
})
export class WalletPaymentComponent {
  @Input() paymentAmount!: number;
  @Input() walletBalance!: number;
  @Input() walletId!: string;
  @Input() planDuration!: number;
  @Input() offerId!: string;
  @Input() userId!: string;

  isLoading: boolean = true;


  constructor(
    private walletService: WalletService,
    private paymentService: PaymentContractService,
    private router: Router,
    private paymentPlanService: PaymentPlanService,
  ) {
  }


  get remainingBalance(): number {
    return this.walletBalance - this.paymentAmount;
  }

  get hasSufficientFunds(): boolean {
    return this.walletBalance >= this.paymentAmount;
  }

  // async confirmPayment() {
  //   if (!this.hasSufficientFunds) return;
  //   try {
  //     const paymentResponse = await this.savePayment();
  //     const walletResponse = await this.updateWallet();
  //     console.log(paymentResponse);
  //     this.router.navigate([`/paymentPlan/${paymentResponse.contractPaymentId}`])

  //   } catch (error) {
  //     console.error("error in wallet : ", error)
  //   }

  // }


  private async updateWallet(): Promise<any> {
    const newWallet: WalletRequest = {
      userId: this.userId,
      currency: "USD",
      fullName: "John Doe",
      source: TransactionType.PAYMENT,
    };

    return this.walletService.update(newWallet, this.walletId, this.paymentAmount)
      .toPromise()
      .then(response => {

        this.walletBalance = response.balance;
        return response;
      });
  }
  // async savePayment(): Promise<void> {
  //   console.log('savePayment method called');
  //   const paymentData = {
  //     planDuration: this.planDuration,
  //     offerId: this.offerId,
  //     userId: this.userId,
  //     totalAmount: this.paymentAmount,
  //   };
  //   console.log(paymentData)
  //   return new Promise((resolve, reject) => {
  //     this.isLoading = true;
  //     this.paymentService.makePayment(paymentData).subscribe(
  //       (response: any) => {
  //         console.log("payment response", response);
  //         resolve();
  //       },
  //       error: (err) => {
  //         this.isLoading = false;
  //         reject(err);
  //       }

  //     )
  //   });
  // }

  async savePayment(): Promise<PaymentContractResponse> {

    this.isLoading = true;

    try {
      const paymentData = this.buildPaymentPayload();
      const response$ = await this.paymentService.post(
        paymentData,
        PaymentMethod.WALLET

      ).toPromise();
      if (!response$)
        throw new Error('No response received from the payment  server ')
      return response$
    } catch (error) {
      console.error("Payment failed:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  private buildPaymentPayload(): any {
    return {
      userId: this.userId,
      offerId: this.offerId,
      planDuration: this.planDuration,
      totalAmount: this.paymentAmount,
    };
  }
}

