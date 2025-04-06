import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { MyFormFieldDto } from 'src/app/core/models/my-form-field';
import { FormFieldDto } from 'src/app/core/models/form-field-dto';
import { AutoInsuranceRequest } from 'src/app/core/models/auto-insurance-request';
import { QuoteResponse } from 'src/app/core/models/quote-response';
import { StorageService } from 'src/app/core/services/storage.service';
import { AutomobileQuoteControllerService } from 'src/app/core/services/automobile-quote-controller.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: [
    '../../insurances/nice-select.css',
    '../../insurances/form.css',
    './test.component.css',
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
export class TestComponent {
formId!: string;
  offerId!: string;
  insuranceForm!: FormGroup;
  isLoading: boolean = false;
  isFormSubmitted: boolean = false;
  isResponseReady: boolean = false;
  isAppointmentActive: boolean = false;
  selectedValue: number = 0;
  showPopup = false;
  step: number = 1;
  maxSteps: number = 1;
  showMap: boolean = false;
  position: any = null;
  data2Save!: AutoInsuranceRequest;
  quoteResponse!: QuoteResponse;
  popupMessage!: string;

  filteredFormFields: MyFormFieldDto[] = [];
  chosenFormFields: any[] = [];
  errorstable: { field: string }[] = [];

  formConfigurations: any = {
    auto: {
      data: [
        {
          label: 'VIN (Vehicle Identification Number)',
          type: 'text',
          required: true,
          placeholder: 'Enter 17-character VIN',
          regex: '^[A-HJ-NPR-Z0-9]{17}$',
          regexErrorMessage: 'Must be a valid 17-character VIN',
          step: 1,
        },
        {
          label: 'License Number',
          type: 'text',
          required: true,
          placeholder: 'Enter your license number',
          regex: '^[A-Za-z0-9-]{6,20}$',
          regexErrorMessage: 'Invalid license number format',
          step: 1,
        },
        {
          label: 'Driving Experience (years)',
          type: 'number',
          required: true,
          placeholder: 'Enter years of experience',
          regex: '^[0-9]{1,3}$',
          regexErrorMessage: 'Enter a valid number of years',
          step: 1,
        },
        {
          label: 'Vehicle Type',
          type: 'select',
          required: true,
          selectOptions: ['Car', 'Motorcycle', 'Truck'],
          placeholder: 'Select vehicle type',
          order: 9,
          step: 1,
        },
        {
          label: 'Vehicle Make',
          type: 'text',
          required: true,
          placeholder: 'Enter vehicle make',
          regex: '^[A-Za-z0-9\\s-]{2,50}$',
          regexErrorMessage: 'Invalid vehicle make',
          order: 10,
          step: 1,
        },
        {
          label: 'Vehicle Model',
          type: 'text',
          required: true,
          placeholder: 'Enter vehicle model',
          regex: '^[A-Za-z0-9\\s-]{2,50}$',
          regexErrorMessage: 'Invalid vehicle model',
          order: 11,
          step: 1,
        },
        {
          label: 'Accident History (past 3 years)',
          type: 'select',
          required: true,
          selectOptions: ['0 accidents', '1 accident', '2+ accidents'],
          placeholder: 'Select accident history',
          order: 12,
          step: 1,
        },
        {
          label: 'Traffic Violations',
          type: 'checkbox',
          required: false,
          selectOptions: ['Speeding', 'Running Red Light', 'DUI'],
          order: 13,
          step: 1,
        },
        {
          label: 'Defensive Driving Course',
          type: 'checkbox',
          required: false,
          order: 14,
          step: 1,
        },
        {
          label: 'Coverage Type',
          type: 'select',
          required: true,
          selectOptions: ['Basic', 'Comprehensive', 'Third-Party'],
          placeholder: 'Select coverage type',
          order: 15,
          step: 2,
        },
        {
          label: 'Billing Period ',
          type: 'select',
          required: true,
          selectOptions: ['MONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL'],
          placeholder: 'Select coverage type',
          step: 2,
        },
        {
          label: 'Location',
          type: 'map',
          placeholder: 'Select your governorate',
          step: 2,
        },
      ],
      nbrSteps: 2,
    },
    health: {
      data: [
        // Step 1: Personal Information
        // {
        //   label: 'Full Name',
        //   type: 'text',
        //   required: true,
        //   placeholder: 'Enter your full name',
        //   regex: '^[A-Za-z\\s]{2,}$',
        //   regexErrorMessage: 'Must contain at least 2 alphabetical characters',
        //   order: 1,
        //   step: 1
        // },
        // {
        //   label: 'Date of Birth',
        //   type: 'date',
        //   required: true,
        //   placeholder: 'Select your date of birth',
        //   minDate: '1900-01-01',
        //   maxDate: new Date().toISOString().split('T')[0],
        //   order: 2,
        //   step: 1
        // },
        // {
        //   label: 'CIN',
        //   type: 'text',
        //   required: true,
        //   placeholder: 'Enter your CIN',
        //   regex: '^[0-9]{8}$',
        //   regexErrorMessage: 'CIN must be exactly 8 digits',
        //   order: 3,
        //   step: 1
        // },
        // {
        //   label: 'Phone Number',
        //   type: 'tel',
        //   required: true,
        //   placeholder: 'Enter your phone number',
        //   regex: '^[0-9]{8,15}$',
        //   regexErrorMessage: 'Phone number must be 8-15 digits',
        //   order: 4,
        //   step: 1
        // },
        // {
        //   label: 'Email',
        //   type: 'email',
        //   required: true,
        //   placeholder: 'Enter your email',
        //   regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        //   regexErrorMessage: 'Enter a valid email address',
        //   order: 5,
        //   step: 1
        // },

        // Step 2: Health Information
        {
          label: 'Annual Income (TND)',
          type: 'number',
          required: true,
          placeholder: 'Enter your annual income',
          min: 0,
          max: 1000000,
          regex: '^\\d{4,7}$',
          regexErrorMessage: 'Must be a valid amount (4-7 digits)',
          order: 6,
          step: 1,
        },
        {
          label: 'Coverage Type',
          type: 'select',
          required: true,
          selectOptions: ['Basic', 'Standard', 'Premium'],
          placeholder: 'Select coverage type',
          order: 7,
          step: 1,
        },
        {
          label: 'Existing Conditions',
          type: 'checkbox-group',
          required: false,
          selectOptions: ['Diabetes', 'Hypertension', 'Heart Disease', 'None'],
          order: 8,
          step: 1,
        },
        {
          label: 'Include Dental Coverage',
          type: 'checkbox',
          required: false,
          order: 9,
          step: 1,
        },
        {
          label: 'Include Optical Coverage',
          type: 'checkbox',
          required: false,
          order: 10,
          step: 1,
        },
      ],
      nbrSteps: 1,
    },
    home: {
      data: [
        {
          label: 'Property Address',
          type: 'map',
          placeholder: 'Select your Property Address',
          order: 1,
          step: 1,
        },
        {
          label: 'Property Type',
          type: 'select',
          required: true,
          selectOptions: ['Apartment', 'House', 'Villa', 'Commercial'],
          placeholder: 'Select property type',
          order: 3,
          step: 1,
        },
        {
          label: 'Square Footage (m²)',
          type: 'number',
          required: true,
          placeholder: 'Enter area in square meters',
          min: 10,
          max: 1000,
          regex: '^\\d{2,5}$',
          regexErrorMessage: 'Must be a valid area (10-99999 m²)',
          order: 4,
          step: 1,
        },
        {
          label: 'Year Built',
          type: 'number',
          required: true,
          placeholder: 'Enter construction year',
          min: 1900,
          max: new Date().getFullYear(),
          regex: '^(19|20)\\d{2}$',
          regexErrorMessage:
            'Enter a valid year between 1900-' + new Date().getFullYear(),
          order: 5,
          step: 1,
        },
        {
          label: 'Coverage Type',
          type: 'select',
          required: true,
          selectOptions: ['Basic', 'Extended', 'Premium'],
          placeholder: 'Select coverage type',
          order: 6,
          step: 2,
        },
        {
          label: 'Include Flood Insurance',
          type: 'checkbox',
          required: false,
          order: 7,
          step: 2,
        },
        {
          label: 'Include Earthquake Coverage',
          type: 'checkbox',
          required: false,
          order: 8,
          step: 2,
        },
        {
          label: 'Estimated Property Value (TND)',
          type: 'number',
          required: true,
          placeholder: 'Enter property value',
          min: 10000,
          max: 5000000,
          regex: '^\\d{5,7}$',
          regexErrorMessage: 'Must be a valid amount (5-7 digits)',
          order: 9,
          step: 2,
        },
        {
          label: 'Security Features',
          type: 'checkbox-group',
          required: false,
          selectOptions: [
            'Alarm System',
            'Security Cameras',
            'Gated Community',
            'None',
          ],
          order: 10,
          step: 2,
        },
      ],
      nbrSteps: 2,
    },
    life: {
      data: [
        // Step 1: Personal Information
        // {
        //   label: 'Full Name',
        //   type: 'text',
        //   required: true,
        //   placeholder: 'Enter your full name',
        //   regex: '^[A-Za-z\\s]{2,}$',
        //   regexErrorMessage: 'Must contain at least 2 alphabetical characters',
        //   order: 1,
        //   step: 1
        // },
        // {
        //   label: 'Date of Birth',
        //   type: 'date',
        //   required: true,
        //   placeholder: 'Select your date of birth',
        //   minDate: '1900-01-01',
        //   maxDate: new Date().toISOString().split('T')[0],
        //   order: 2,
        //   step: 1
        // },
        // {
        //   label: 'CIN',
        //   type: 'text',
        //   required: true,
        //   placeholder: 'Enter your CIN',
        //   regex: '^[0-9]{8}$',
        //   regexErrorMessage: 'CIN must be exactly 8 digits',
        //   order: 3,
        //   step: 1
        // },
        // {
        //   label: 'Email',
        //   type: 'email',
        //   required: true,
        //   placeholder: 'Enter your email',
        //   regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        //   regexErrorMessage: 'Enter a valid email address',
        //   order: 4,
        //   step: 1
        // },
        // {
        //   label: 'Phone Number',
        //   type: 'tel',
        //   required: true,
        //   placeholder: 'Enter your phone number',
        //   regex: '^[0-9]{8,15}$',
        //   regexErrorMessage: 'Phone number must be 8-15 digits',
        //   order: 5,
        //   step: 1
        // },

        // Step 2: Policy Details
        {
          label: 'Desired Coverage Amount (TND)',
          type: 'number',
          required: true,
          placeholder: 'Enter coverage amount',
          min: 10000,
          max: 1000000,
          regex: '^\\d{5,7}$',
          regexErrorMessage: 'Must be a valid amount (5-7 digits)',
          order: 6,
          step: 1,
        },
        {
          label: 'Term Length',
          type: 'select',
          required: true,
          selectOptions: ['10 Years', '20 Years', '30 Years'],
          placeholder: 'Select term length',
          order: 7,
          step: 1,
        },
        {
          label: 'Include Critical Illness',
          type: 'checkbox',
          required: false,
          order: 8,
          step: 1,
        },
        {
          label: 'Smoker',
          type: 'radio',
          required: true,
          selectOptions: ['Yes', 'No'],
          order: 9,
          step: 1,
        },
        {
          label: 'Dangerous Occupation',
          type: 'checkbox',
          required: false,
          order: 10,
          step: 1,
        },
      ],
      nbrSteps: 1,
    },
  };

  formTypes = [
    { id: 'auto', label: 'Auto', icon: 'fas fa-car' },
    { id: 'health', label: 'Health', icon: 'fas fa-heartbeat' },
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'life', label: 'Life', icon: 'fas fa-umbrella' },
  ];

  currentFormType = 'auto';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private autoInsuranceService: AutomobileQuoteControllerService,
    private storageService:StorageService
  ) {}

  ngOnInit() {
    this.formId = this.route.snapshot.paramMap.get('formId') || 'null';
    this.offerId = this.route.snapshot.paramMap.get('offerId') || 'null';
    this.insuranceForm = this.fb.group({});
    this.initializeForm('auto');
  }

  initializeForm(formType: string): void {
    this.currentFormType = formType;
    this.chosenFormFields = this.formConfigurations[formType].data;
    this.step = 1;
    this.maxSteps = this.formConfigurations[formType].nbrSteps;
    this.filteredFields();
  }

  changeFormType(formType: string): void {
    if (!this.isLoading)
      if (formType !== this.currentFormType) {
        this.initializeForm(formType);
        this.clearVariables();
      }
  }

  createFormControls(): void {
    if (!this.insuranceForm) {
      console.error('insuranceForm is not initialized');
      return;
    }

    this.filteredFormFields.forEach((field, index) => {
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
        field.label.split(' ').join(''),
        this.fb.control('', validators)
      );
    });
  }

  filteredFields() {
    this.filteredFormFields = this.chosenFormFields.filter(
      (field) => field.step === this.step
    );
    this.createFormControls();
    this.checkErros();
  }

  nextStep() {
    if (this.step < this.maxSteps) {
      this.step++;
      this.filteredFields();
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
      this.filteredFields();
    }
  }

  getFormControlName(field: any): string {
    return field.label.split(' ').join('');
  }

  trackByFn(index: number, item: any): any {
    return index;
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (!this.position) return;

    if (this.insuranceForm.valid) {
      this.showPopup = true;
      this.isLoading = true;

      const list = this.insuranceForm.value;
      let temp: any[] = [];
      Object.entries(list).forEach(([key, value]) => temp.push(value));
      this.data2Save = {
        vin: temp[0],
        licenseNumber: temp[1],
        drivingExperience: temp[2],
        vehicleType: temp[3],
        vehicleMake: temp[4],
        vehicleModel: temp[5],
        accidentHistory: temp[6],
        trafficViolations: temp[7] || false,
        defensiveDrivingCourse: temp[8] || false,
        coverageType: temp[9],
        addressInfo: this.position,
        billingPeriod: temp[10],
      };
      this.storageService.set(this.currentFormType,this.data2Save)
      this._calculate();
    }
  }

  private _calculate() {
    this.isLoading = true;
    this.autoInsuranceService.calculate({ body: this.data2Save }).subscribe({
      next: (response) => {
        this.isResponseReady = true;
        this.popupMessage = 'The Quote Is generated Successfuly';
        this.quoteResponse = response;
        this.isLoading = false;
        this.isFormSubmitted = false;
        this.cleanForm();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.isResponseReady = false;
        this.isFormSubmitted = false;
        const message =
          err?.error?.['error: '] || 'An unexpected error occurred.';
        const words = message.split(' ');
        const secondWord = words[1] || '';
        if (['model', 'make', 'type'].includes(secondWord.toLowerCase())) {
          let controleName = words[0] + secondWord;
          this.errorstable.push({ field: controleName });
        }
        this.popupMessage = message;
      },
    });
  }

  cleanForm() {
    this.insuranceForm.reset();
  }

  getCurrentValue(field: FormFieldDto): number {
    const controlName = this.getFormControlName(field);
    return this.insuranceForm.get(controlName)?.value || field.rangeStart;
  }

  updateRangeValue(field: FormFieldDto, event: Event): void {
    const controlName = this.getFormControlName(field);
    const value = (event.target as HTMLInputElement).value;
    this.insuranceForm.get(controlName)?.setValue(value);
  }

  toggleMap() {
    this.showMap = !this.showMap;
  }

  getPosition(data: any) {
    this.position = data;
  }

  newQuote(){
    this.clearVariables();
    this.initializeForm('auto');
  }

  closePopup() {
    this.showPopup = false;
  }

  clearVariables() {
    this.isFormSubmitted = false;
    this.isResponseReady = false;
  }

  checkErros() {
    this.errorstable.forEach((error) => {
      if (this.insuranceForm.controls[error.field]) {
        console.log(error.field);
        setTimeout(() => {
          this.insuranceForm.controls[error.field].setErrors({
            incorrect: true,
          });
          this.insuranceForm.controls[error.field].markAsTouched();
        });
      }
    });
    this.errorstable = [];
  }
}
