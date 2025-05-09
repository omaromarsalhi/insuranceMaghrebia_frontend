import { Component, AfterViewInit, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { OfferFormControllerService } from 'src/app/core/services/offer/offer-form-controller.service';

import { trigger, transition, style, animate } from '@angular/animations';
import { FormFieldDto } from 'src/app/core/models/offer/form-field-dto';
import { PurchasedOfferRequest } from 'src/app/core/models/offer/purchased-offer-request';
import { PurchasedOfferControllerService } from 'src/app/core/services/offer/purchased-offer-controller.service';
import { OfferControllerService } from 'src/app/core/services/offer/offer-controller.service';
import { OfferResponse } from 'src/app/core/models/offer/offer-response';
import { WalletPaymentComponent } from 'src/app/payment/wallet-payment/wallet-payment.component';
import { MatDialog } from '@angular/material/dialog';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  selector: 'app-purshased-offer',
  templateUrl: './purshased-offer.component.html',
  styleUrls: [
    '../../form.css',
    './purshased-offer.component.css',
    '../../nice-select.css',
  ],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('100ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate(
          '200ms 100ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('slideFade', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
        }),
        animate(
          '1400ms ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '400ms ease-in',
          style({
            opacity: 0,
            transform: 'translateY(-10px)',
          })
        ),
      ]),
    ]),
  ],
})
export class PurshasedOfferComponent implements OnInit {
  formId!: string;
  offerId!: string;
  insuranceForm!: FormGroup;
  formFields: Array<FormFieldDto> = [];
  paymentFormFields: Array<FormFieldDto> = [];
  chosenForm: Array<FormFieldDto> = [];
  isLoading: boolean = false;
  notValid: boolean = false;
  selectedValue: number = 0;
  data2Save: PurchasedOfferRequest = { data: [] };
  offerDetails!: OfferResponse;
  showPopup = false;
  price: any;
  step: number = 1;
  maxSteps: number = 2;

  paymentForm!: FormGroup;
  totalAmount!: number;
  selectedMethod: string | null = null;
  walletBalance!: number;
  showWalletPanel: boolean = false;
  isWalletDialogOpen = false;
  walletId!: string;
  isButtonVisible = false;

  constructor(
    private fb: FormBuilder,
    private formData: OfferFormControllerService,
    private route: ActivatedRoute,
    private purchasedoffer: PurchasedOfferControllerService,
    private offerService: OfferControllerService,
    public dialog: MatDialog,
    private router: Router,
    private walletService: WalletService
  ) { }

  ngOnInit() {
    this.formId = this.route.snapshot.paramMap.get('formId') || 'null';
    this.offerId = this.route.snapshot.paramMap.get('offerId') || 'null';
    this.price = this.route.snapshot.queryParamMap.get('price');
    this.insuranceForm = this.fb.group({});

    this.loadWalletData("user_4444");

    this._fetchData(() => {
      this.createFormControls();
    });

    this._fetchOfferData(() => {
      this.formatPaymentData();
    });
  }

  createFormControls(): void {
    if (!this.insuranceForm) {
      console.error('insuranceForm is not initialized');
      return;
    }

    this.chosenForm.forEach((field, index) => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }
      if (field.regex) {
        let pattern = field.regex;
        if (pattern.startsWith('/') && pattern.endsWith('/')) {
          pattern = pattern.slice(1, -1);
        }
        validators.push(Validators.pattern(pattern));
      }

      this.insuranceForm.addControl(
        `${field.type}_${index}`,
        this.fb.control('', validators)
      );
    });
  }

  getFormControlName(field: any, index: number): string {
    return `${field.type}_${index}`;
  }

  trackByFn(index: number, item: any): any {
    return index;
  }

  onSubmit() {
    if (this.insuranceForm.valid) {
      this.notValid = false;
      this.showPopup = true;
      this.isLoading = true;
      const list = this.insuranceForm.value; // Assuming it's a JSON object

      Object.entries(list).forEach(([key, value], index) => {
        this.data2Save.data!.push({
          fieldLabel: this.formFields[index].label,
          fieldType: this.formFields[index].type,
          fieldValue: value,
        });
      });
      this.data2Save.formId = this.formId;
      this.data2Save.userId = 'omar';
      this.saveForData();
      setTimeout(() => {
        this.isLoading = false;
        this.cleanForm();
      }, 1000);
    } else this.notValid = true;
  }

  saveForData() {
    const parm = {
      body: this.data2Save,
    };

    this.purchasedoffer.create(parm).subscribe(() => {
      setTimeout((response: string) => {
        console.log('form responce: ' + response);
        this.isLoading = false;
        this.notValid = false;
        this.insuranceForm.reset();
      }, 2000);
    });
  }

  cleanForm() {
    this.insuranceForm.reset();
  }

  nextStep() {
    if (this.step < this.maxSteps) {
      this.step++;
      this.chosenForm = this.paymentFormFields;
      this.createFormControls();
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
      this.chosenForm = this.formFields;
      this.createFormControls();
    }
  }
  // Method to get the current value of the range input
  getCurrentValue(field: FormFieldDto, index: number): number {
    const controlName = this.getFormControlName(field, index);
    return this.insuranceForm.get(controlName)?.value || field.rangeStart;
  }

  // Method to update the current value when the range input changes
  updateRangeValue(field: FormFieldDto, index: number, event: Event): void {
    const controlName = this.getFormControlName(field, index);
    const value = (event.target as HTMLInputElement).value;
    this.insuranceForm.get(controlName)?.setValue(value);
  }

  formatPaymentData() {
    if (this.paymentFormFields.length < 4)
      this.paymentFormFields.push(
        {
          label: 'Settlement Plan',
          type: 'show_text',
          placeholder: this.offerDetails.packages?.filter(
            (p) => p.price == this.price
          )[0].duration,
        },
        {
          label: 'Offer Category',
          type: 'show_text',
          placeholder: this.offerDetails.category?.name,
        },
        {
          label: 'Total Amout',
          type: 'show_text',
          placeholder: this.price + ' Dt',
        }
      );
  }

  private loadWalletData(userid: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.isLoading = true;
      this.walletService.getOne(userid, false).subscribe({
        next: (walletResponse) => {
          this.walletBalance = walletResponse.balance;
          this.walletId = walletResponse.walletId;
          console.log('wallet responsee ', walletResponse);
          console.log('wallet wallet IDe ', walletResponse.walletId);
          // this.isLoading = false;
          resolve();
        },
        error: (err) => {
          this.isLoading = false;
          reject(err);
        },
      });
    });
  }

  openWalletModal() {
    this.isWalletDialogOpen = !this.isWalletDialogOpen
    this.selectedMethod = 'wallet'
    // this.isButtonVisible = false;
    // if (this.paymentForm.invalid) {
    //   return;
    // }
    // this.selectedMethod = 'wallet';
    // this.isWalletDialogOpen = true;
    // await this.loadWalletData('user_4444');
    // const dialogRef = this.dialog.open(WalletPaymentComponent, {
    //   width: '450px',
    //   position: {
    //     top: '150px',
    //     left: '1000px',
    //   },
    //   panelClass: 'centered-dialog',
    //   data: {
    //     paymentAmount: this.totalAmount,
    //     walletBalance: this.walletBalance,
    //     walletId: this.walletId,
    //     planDuration: this.paymentForm.get('planDuration')?.value,
    //     offerId: this.paymentForm.get('offerId')?.value,
    //     userId: this.paymentForm.get('userId')?.value,
    //   },
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.selectedMethod = null;
    //   this.isButtonVisible = false;
    //   this.isWalletDialogOpen = false;
    //   console.log('the selecteed methode equals to :', this.selectedMethod);
    //   if (result) this.processWalletPayment();
    // });
  }

  // selectPayment(method: 'card' | 'wallet') {
  //   if (this.isWalletDialogOpen) {
  //     return;
  //   }

  //   this.selectedMethod = this.selectedMethod === method ? null : method;
  //   console.log('the selected emthode is :', method);
  //   this.isButtonVisible = method === 'card' && this.selectedMethod === 'card';
  // }

  proceedToPayment() {
    this.isWalletDialogOpen = false;
    this.selectedMethod = 'card';
    if (this.selectedMethod === 'card') {
      this.router.navigate(['/card-payment']);
    }
  }

  processWalletPayment() {
    console.log('Processing wallet payment...');
  }

  private _fetchData(callback: () => void): void {
    const param = { formId: this.formId };

    this.formData.get(param).subscribe({
      next: (form) => {
        if (!form || !form.fields) return;

        this.formFields = form.fields;
        this.chosenForm = this.formFields;

        callback();
      },
      error: (error) => {
        console.error('Error fetching form data:', error);
      },
    });
  }

  private _fetchOfferData(callback: () => void): void {
    const param = { formId: this.formId };

    this.formData.get(param).subscribe({
      next: (form) => {
        if (!form || !form.fields) return;

        this.formFields = form.fields;
        this.chosenForm = this.formFields;

        callback();
      },
      error: (error) => {
        console.error('Error fetching form data:', error);
      },
    });

    this.offerService.getByOfferId({ offerId: this.offerId }).subscribe({
      next: (offer) => {
        this.offerDetails = offer;
        callback();
      },
      error: (error) => {
        console.error('Error fetching form data:', error);
      },
    });
  }
}
