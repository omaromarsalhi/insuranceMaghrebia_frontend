import { Component, AfterViewInit, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  FormFieldDto,
  PurchasedOfferDataDto,
  PurchasedOfferRequest,
} from 'src/app/core/models';
import { OfferFormControllerService } from 'src/app/core/services/offer-form-controller.service';
import { firstValueFrom } from 'rxjs';
import { PurchasedOfferControllerService } from 'src/app/core/services';

@Component({
  selector: 'app-purshased-offer',
  templateUrl: './purshased-offer.component.html',
  styleUrls: ['./purshased-offer.component.css', './nice-select.css'],
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

  constructor(
    private fb: FormBuilder,
    private formData: OfferFormControllerService,
    private route: ActivatedRoute,
    private purchasedoffer: PurchasedOfferControllerService
  ) {}

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
    // this.isLoading = true;
    // if (this.insuranceForm.valid) {
      const list = this.insuranceForm.value; // Assuming it's a JSON object

      Object.entries(list).forEach(([key,value], index) => {
        this.data2Save.data!.push({
          fieldLabel: this.formFields[index].label,
          fieldType: this.formFields[index].type,
          fieldValue: value,
        });
      });
      this.data2Save.formId = this.formId;
      console.log(this.saveForData)
      this.saveForData();

      return;
    // }
    this.isLoading = false;
    this.notValid = true;
  }

  saveForData() {
    const parm = {
      body: this.data2Save,
    };

    this.purchasedoffer.create(parm).subscribe(() => {
      setTimeout((response:string) => {
        console.log("form responce: "+response)
        this.isLoading = false;
        this.notValid = false;
        this.insuranceForm.reset();
      }, 2000);
    });
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
