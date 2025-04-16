import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WalletService } from '../core/services/wallet.service';
import { WalletRequest } from '../core/models/wallet/WalletRequest';
import { TransactionType } from '../core/models/wallet/TransactionType';
import { WalletResponse } from '../core/models/wallet/WalletResponse';
import { WalletTransactionRequest } from '../core/models/wallet/TransactionWalletRequest';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isWalletDropdownOpen: boolean = false;
  walletBalance!: number;
  userHasWallet: boolean = false;
  premiumPayment!: number;
  claimRefund!: number;
  isLoading: boolean = true;
  wallet!: WalletResponse;

  constructor(
    private elementRef: ElementRef,
    private actvRoute: ActivatedRoute,
    private walletService: WalletService

  ) { }


  ngOnInit(): void {

    this.actvRoute.queryParams.subscribe(
      param => {
        const userId = param['userId'] || null;
        if (userId) {
          this.userHasWallet = true;
          this.loadWalletData(userId);
        }
      })
  }

  private loadWalletData(userid: String) {

    this.isLoading = true;
    this.walletService.getOne(userid).subscribe({
      next: (walletResponse) => {
        this.handleWalletResponse(walletResponse)
      },
      error: (err) => {
        console.error('Failed to load wallet:', err);
        this.isLoading = false;
      }
    });
  }

  private handleWalletResponse(wallet: WalletResponse) {
    if (!wallet?.transactions) return;
    this.premiumPayment = this.getLatestTransactionAmount(wallet.transactions, TransactionType.PAYMENT)!;
    this.claimRefund = this.getLatestTransactionAmount(wallet.transactions, TransactionType.CLAIM_PAYOUT)!;

    this.walletBalance = wallet.balance;
  }
  private getLatestTransactionAmount(
    transactions: WalletTransactionRequest[],
    type: TransactionType
  ): number {
    if (!transactions) return 0;
    const found = transactions.find(t => t.type == type);
    return found?.amount || 0;
  }

  toggleWalletDropdown() {
    this.isWalletDropdownOpen = !this.isWalletDropdownOpen;
  }

  setupWallet() {

    this.isWalletDropdownOpen = false;
    this.createNewWallet();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isWalletDropdownOpen = false;
    }
  }

  createNewWallet() {
    const newWallet: WalletRequest = {
      userId: "user_4444",
      currency: "USD",
      fullName: "John Doe",
      source: TransactionType.DEPOSIT,
    };

    this.walletService.create(newWallet).subscribe({
      next: (response) => {
        console.log('Wallet created successfully!', response);
        this.walletBalance = response.balance
        this.userHasWallet = true;

      },
      error: (err) => {
        console.error('Error creating wallet:', err);
      }
    });
  }


}