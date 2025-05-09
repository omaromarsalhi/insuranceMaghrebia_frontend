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
  ],
})
export class PurshasedOfferComponent implements OnInit {
  formId!: string;
  offerId!: string;
  insuranceForm!: FormGroup;
  formFields: Array<FormFieldDto> = [];
  isLoading: boolean = false;
  notValid: boolean = false;
  selectedValue: number = 0;
  data2Save: PurchasedOfferRequest = { data: [] };
  showPopup = false;

  constructor(
    private fb: FormBuilder,
    private formData: OfferFormControllerService,
    private route: ActivatedRoute,
    private purchasedoffer: PurchasedOfferControllerService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.formId = this.route.snapshot.paramMap.get('formId') || 'null';
    this.offerId = this.route.snapshot.paramMap.get('offerId') || 'null';

    this.insuranceForm = this.fb.group({});

    this._fetchData(() => {
      this.createFormControls();
    });
  }

  createFormControls(): void {
    if (!this.insuranceForm) {
      console.error('insuranceForm is not initialized');
      return;
    }

    this.formFields.forEach((field, index) => {
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
    this.showPopup = true;
    this.isLoading = true;
    if (this.insuranceForm.valid) {
      const list = this.insuranceForm.value; // Assuming it's a JSON object

      Object.entries(list).forEach(([key, value], index) => {
        this.data2Save.data!.push({
          fieldLabel: this.formFields[index].label,
          fieldType: this.formFields[index].type,
          fieldValue: value,
        });
      });
      this.data2Save.formId = this.formId;
      console.log("the séved data", this.saveForData);
      this.saveForData();
      // this.router.navigate(['/payments/payment', `${this.offerId}`]);
    }
    setTimeout(() => {
      this.isLoading = false;
      // this.cleanForm();
    }, 1000);
    this.notValid = true;
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

  private _fetchData(callback: () => void): void {
    const param = { formId: this.formId };

    this.formData.get(param).subscribe({
      next: (form) => {
        if (!form || !form.fields) return;

        this.formFields = form.fields;

        callback();
      },
      error: (error) => {
        console.error('Error fetching form data:', error);
      },
    });
  }
}
