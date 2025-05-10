import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentIntentService } from 'src/app/core/services/payment/paymentIntent';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { PaymentIntentDto } from 'src/app/core/models/stripe/PaymentIntentDto';
import { PaymentContractService } from 'src/app/core/services/payment/payment-contract.service';
import { BlockchainService } from 'src/app/core/services/payment/blockchain.service';
import { PaymentBlockRequestDto } from 'src/app/core/models/blockchain/PaymentBlockRequestDto';
import { PaymentPlanService } from 'src/app/core/services/payment/payment-plan.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopUpComponent } from '../utils/pop-up/pop-up.component';
import { ErrorPopUpComponent } from '../utils/error-pop-up/error-pop-up.component';
import SignaturePad from 'signature_pad';
import { SignatureService } from 'src/app/core/services/payment/singature.service';
import { signatureRequest } from 'src/app/core/models/signature/signatureRequest';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef;
  signaturePad!: SignaturePad;
  hasValidSignature = false;
  signatureVisible = false;

  paymentForm!: FormGroup;
  totalAmount!: number;

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card!: StripeCardElement;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isProcessing: boolean = false;
  hashblock: string = '';
  blockchaindto: PaymentBlockRequestDto | null = null;
  paymentPlanId!: string;
  paymentContractId!: string;
  paymentType!: 'contract' | 'plan';
  signatureData: string | null = null;
  signatureRequest!: signatureRequest;
  isSigned = false;
  isVerifyingSignature = false;
  signatureVerificationResult: any = null;
  signatureVerificationMessage = '';


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actvRoute: ActivatedRoute,
    private paymentService: PaymentIntentService,
    private paymentContractService: PaymentContractService,
    private blockchainService: BlockchainService,
    private paymentPlanService: PaymentPlanService,
    private modalService: NgbModal,
    private signatureService: SignatureService

  ) { }




  ngOnInit(): void {
    // this.totalAmount = Number(this.actvRoute.snapshot.paramMap.get('totalAmount'));
    this.initializeForm();
    this.getRouteParams();
    this.initializeStripe();
  }

  private initializeForm(): void {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      line1: ['', Validators.required],
      city: ['', Validators.required],
      postal_code: ['', Validators.required],
    });
  }
  ngAfterViewInit() {
    console.log("Initializing signature pad...");
    if (this.signatureCanvas) {
      this.setupSignaturePad();
    }
  }

  private getRouteParams(): void {
    this.totalAmount = Number(this.actvRoute.snapshot.paramMap.get('totalAmount'));

    this.actvRoute.queryParams.subscribe(params => {
      this.paymentPlanId = params['planId'] || null;
      this.paymentType = params['type'] || null;
      this.paymentContractId = params['contractId'] || null;
    });
  }
  async initializeStripe(): Promise<void> {
    try {
      this.stripe = await loadStripe('pk_test_51QuEtGA3IRpOqAjD19y87vjYVjauMymaxNEA58EmVBTRSCutsQYZ5yXCtngEw0YQrnYepGyZ21pTV18M383fuNhM00KMjER1WJ');
      if (this.stripe) {
        this.elements = this.stripe.elements();
        this.card = this.elements.create('card');
        this.card.mount('#card-element');
      } else {
        throw new Error('Stripe failed to initialize');
      }
    } catch (error) {
      this.handleError('Payment system initialization failed. Please refresh the page.');
      console.error('Stripe initialization error:', error);
    }
  }
  // Signature Section 
  toggleSignaturePad() {
    this.signatureVisible = !this.signatureVisible;
    if (this.signatureVisible) {
      setTimeout(() => {
        this.resizeSignaturePad();
        if (!this.signaturePad) {
          this.setupSignaturePad();
        }
      }, 10);
    }
  }

  private resizeSignaturePad() {
    if (!this.signatureCanvas) return;

    const canvas = this.signatureCanvas.nativeElement;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d')?.scale(ratio, ratio);

    if (this.signaturePad && !this.signaturePad.isEmpty()) {
      const data = this.signaturePad.toData();
      this.signaturePad.clear();
      this.signaturePad.fromData(data);
    }
  }

  private setupSignaturePad() {
    if (!this.signatureCanvas || this.signaturePad) return;

    const canvas = this.signatureCanvas.nativeElement;
    this.signaturePad = new SignaturePad(canvas, {
      minWidth: 1,
      maxWidth: 3,
      penColor: 'rgb(0, 0, 0)',
      backgroundColor: 'rgb(255, 255, 255)'
    });
    this.signaturePad.addEventListener('endStroke', () => {
      this.hasValidSignature = !this.signaturePad.isEmpty();
      console.log('Signature status:', this.hasValidSignature);
    });
    if ('ontouchstart' in window) {
      canvas.style.touchAction = 'none';
      canvas.style.webkitTapHighlightColor = 'transparent';
    }
  }

  clearSignature(): void {
    if (this.signaturePad) {
      this.signaturePad.clear();
      this.hasValidSignature = false;
      this.isVerifyingSignature = false;

    }
  }

  async confirmSignature() {

    console.log("hey i am in the confirm");

    if (this.paymentForm.invalid) {
      this.handleError('Please fill in all required fields.');
      return;
    }
    if (!this.signaturePad.isEmpty()) {

      this.isVerifyingSignature = true;
      this.signatureVerificationResult = null;
      this.signatureVerificationMessage = 'Verifying signature...';

      try {
        const signatureData = this.signaturePad.toDataURL();
        const base64Data = signatureData.split(',')[1];

        this.signatureRequest = {
          base64_data: base64Data,
          fullName: this.paymentForm.get('name')?.value,
          cin: this.paymentForm.get('line1')?.value
        };

        const response = await this.signatureService.verifySignature(this.signatureRequest).toPromise();
        this.signatureVerificationResult = response;
        const similarityScore = response.results;

        if (response.status === "no_matches" && similarityScore == 0) {
          this.handleNewSignatureCase(response);
          this.signatureVerificationMessage = 'New signature registered successfully!';
          this.isVerifyingSignature = false;
        }
        else if (response.status === "success") {
          this.handleSignatureComparison(response);
        }
        else
          this.signatureVerificationMessage = 'New signature registered successfully!';

      } catch (err) {
        console.error("Signature verification failed", err);
        this.isSigned = false;
        this.hasValidSignature = false;
        this.signatureVerificationMessage = 'Error during verification. Please try again.';
      } finally {
        this.isVerifyingSignature = false;
      }
    } else {
      alert("Please draw your signature before confirming.");
    }
  }
  private handleUnexpectedResponse() {
    this.isSigned = false;
    this.hasValidSignature = false;
    this.signatureVerificationMessage = 'Unexpected verification response. Please try again.';
    console.warn("Unexpected response format:", this.signatureVerificationResult);
  }

  private handleVerificationError(error: any) {
    this.isSigned = false;
    this.hasValidSignature = false;

    if (error.status === 404) {
      this.signatureVerificationMessage = 'No signature found for this user.';
    } else {
      this.signatureVerificationMessage = 'Error during verification. Please try again.';
    }
  }


  private handleNewSignatureCase(response: any) {
    this.isSigned = true;
    this.hasValidSignature = true;
    this.signatureVerificationMessage = 'New signature registered successfully!';
    this.signatureVisible = false;
    console.log("New signature stored:", response.message);
  }
  private handleSignatureComparison(response: any) {
    const similarityScore = response.results;

    if (similarityScore >= 61) {
      this.isSigned = true;
      this.hasValidSignature = true;
      this.signatureVerificationMessage = `Signature verified (${similarityScore}% match)`;
      this.signatureVisible = false;
    } else {
      this.isSigned = false;
      this.hasValidSignature = false;

      if (similarityScore >= 41 && similarityScore <= 60) {
        this.signatureVerificationMessage = 'Signature inconclusive. Please sign again.';
      } else {
        this.signatureVerificationMessage = 'Signature verification failed. Please try again.';
      }

      this.clearSignature();
    }

    console.log("Forensic results:", response.forensic_results);
  }

  async handlePayment() {
    if (!this.stripe || !this.card) {
      this.handleError('Payment system not initialized. Please try again.');
      return;
    }

    if (this.paymentForm.invalid) {
      this.handleError('Please fill in all required fields.');
      return;
    }

    this.isProcessing = true;
    this.errorMessage = null;

    try {
      const paymentMethod = await this.createPaymentMethod();
      if (this.paymentType === 'contract') {
        await this.processPaymentContract(paymentMethod.id);
      } else if (this.paymentType === 'plan') {
        await this.processPaymentPlan(paymentMethod.id);
      }
    } catch (error: any) {
      this.handleGeneralError(error);
    } finally {
      this.isProcessing = false;
    }
  }

  async createPaymentMethod() {
    const billingDetails = this.paymentForm.value;
    const { paymentMethod, error } = await this.stripe!.createPaymentMethod({
      type: 'card',
      card: this.card,
      billing_details: {
        name: billingDetails.name,
        address: {
          line1: billingDetails.line1,
          city: billingDetails.city,
          postal_code: billingDetails.postal_code,
        },
      },
    });

    if (error) {
      this.handleStripeError(error);
      throw error;
    }

    return paymentMethod;
  }

  async processPaymentContract(paymentMethodId: string) {
    try {
      const paymentIntent = await this.createPaymentIntent(paymentMethodId);
      await this.updateBlockchainAndPaymentContract(paymentIntent.id);
      this.handleSuccess('Payment successful!');
    } catch (error: any) {
      this.handleGeneralError(error);
    }
  }

  async processPaymentPlan(paymentMethodId: string) {
    try {
      const paymentIntent = await this.createPaymentIntent(paymentMethodId);
      await this.updateBlockchainAndPaymentPlan(paymentIntent.id);
      this.handleSuccess('Payment successful!');
    } catch (error: any) {
      this.handleGeneralError(error);
    }
  }

  async createPaymentIntent(paymentMethodId: string) {
    console.log('the total amount in createPAymentIntnent os ', this.totalAmount)
    const paymentIntentDto: PaymentIntentDto = {
      paymentMethodId,
      currency: 'usd',
      amount: this.totalAmount,
    };
    console.log('the total amount in createPAymentIntnent os ', this.totalAmount)

    const response = await this.paymentService.create(paymentIntentDto).toPromise();
    if (!response || !response.clientSecret) {
      throw new Error('Invalid server response: Missing clientSecret');
    }

    const { error, paymentIntent } = await this.stripe!.confirmCardPayment(response.clientSecret);
    if (error) {
      this.handleStripeError(error);
      throw error;
    }

    return paymentIntent;
  }

  async updateBlockchainAndPaymentContract(paymentIntentId: string) {
    console.log('the amount in blockchain is = ', this.totalAmount)
    this.blockchaindto = {
      paymentId: this.paymentContractId,
      amount: this.totalAmount,
      fullname: this.paymentForm.get('name')?.value,
    };

    const blockchainResponse = await this.blockchainService.create(this.blockchaindto).toPromise();
    this.hashblock = blockchainResponse.blockHash;

    await this.paymentContractService.updatePaymentPlans(this.paymentContractId, this.hashblock).toPromise();
    await this.paymentService.capturePayment(paymentIntentId).toPromise();
  }

  async updateBlockchainAndPaymentPlan(paymentIntentId: string) {
    this.blockchaindto = {
      paymentId: this.paymentPlanId,
      amount: this.totalAmount,
      fullname: this.paymentForm.get('name')?.value,
    };
    console.log(this.blockchaindto.paymentId)

    const blockchainResponse = await this.blockchainService.create(this.blockchaindto).toPromise();
    this.hashblock = blockchainResponse.blockHash;

    await this.paymentPlanService.put(this.paymentPlanId, this.hashblock).toPromise();
    await this.paymentService.capturePayment(paymentIntentId).toPromise();
  }

  handleSuccess(message: string) {
    this.successMessage = message;
    this.onPaymentPopUpSuccess("Success", message);
    this.router.navigate([`/payments/payment-details/${this.paymentPlanId}`]);
  }

  handleError(message: string) {
    this.errorMessage = message;
    this.onPaymentPopUpFailed("Error", message);
  }

  handleStripeError(error: any) {
    const errorMessages: { [key: string]: string } = {
      card_declined: 'Your card was declined. Please use another card.',
      insufficient_funds: 'Insufficient funds. Please try a different payment method.',
      incorrect_cvc: 'Incorrect CVC code. Please check and try again.',
      expired_card: 'Your card has expired. Please use a valid card.',
      processing_error: 'There was a processing error. Try again later.',
    };

    this.handleError(errorMessages[error.code] || error.message || 'Payment failed. Please try again.');
  }

  handleGeneralError(error: any) {
    console.error('Payment processing error:', error);
    this.handleError(error.message || 'An unexpected error occurred. Please try again.');
  }

  handleUpdatePaymentError(error: any) {
    if (error.status === 409) {
      this.handleError('You have already paid for this service.');
    } else {
      this.handleError('Payment failed: ' + error.message);
    }
  }
  onPaymentPopUpSuccess(Title: string, Messages: string) {
    const modalRef = this.modalService.open(PopUpComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.title = Title;
    modalRef.componentInstance.message = Messages;
  }
  onPaymentPopUpFailed(Title: string, Messages: string) {
    const modalRef = this.modalService.open(ErrorPopUpComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.title = Title;
    modalRef.componentInstance.message = Messages;
  }



}