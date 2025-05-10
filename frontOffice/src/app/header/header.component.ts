import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { OfferCategoryControllerService } from '../core/services/offer/offer-category-controller.service';
import { CategoryResponse } from '../core/models/offer/category-response';
import { WalletResponse } from '../core/models/wallet/WalletResponse';
import { ActivatedRoute } from '@angular/router';
import { TransactionType } from '../core/models/wallet/TransactionType';
import { WalletRequest } from '../core/models/wallet/WalletRequest';
import { WalletTransactionRequest } from '../core/models/wallet/TransactionWalletRequest';
import { WalletService } from '../core/services/payment/wallet.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  partivularcategroList: CategoryResponse[] = [];
  showWalletDropdown = false;
  userHasWallet: boolean = false;
  premiumPayment!: number;
  claimRefund!: number;
  isLoading: boolean = true;
  wallet!: WalletResponse;
  walletBalance = 1250.75;

  constructor(
    private categoryService: OfferCategoryControllerService,
    private elementRef: ElementRef,
    private actvRoute: ActivatedRoute,
    private walletService: WalletService
  ) { }

  ngOnInit(): void {
    this._fetchCtaegories('PARTICULAR');
    this.actvRoute.queryParams.subscribe(
      param => {
        const userId = param['userId'] || null;
        if (userId) {
          this.userHasWallet = true;
          this.loadWalletData(userId);
        }
      })
  }


  private _fetchCtaegories(target: 'PARTICULAR' | 'COMPANY') {
    this.categoryService.getAllByTarget({ target }).subscribe((response) => {
      this.partivularcategroList = response;
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



  setupWallet() {

    this.showWalletDropdown = false;
    this.createNewWallet();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showWalletDropdown = false;
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


  toggleWallet() {
    this.showWalletDropdown = !this.showWalletDropdown;
  }

}