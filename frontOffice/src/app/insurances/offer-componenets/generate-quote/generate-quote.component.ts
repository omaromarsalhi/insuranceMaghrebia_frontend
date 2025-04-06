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
import { AutomobileQuoteControllerService } from '../../../core/services/automobile-quote-controller.service';
import { QuoteResponse } from 'src/app/core/models/quote-response';
import { StorageService } from 'src/app/core/services/storage.service';
import { AddressInfo } from 'src/app/core/models/address-info';
import { HealthInsuranceRequest } from 'src/app/core/models';
import { HealthQuoteControllerService } from 'src/app/core/services';

@Component({
  selector: 'app-generate-quote',
  templateUrl: './generate-quote.component.html',
  styleUrls: [
    '../../nice-select.css',
    '../../form.css',
    './generate-quote.component.css',
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
    trigger('fadeOut', [
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class GenerateQuoteComponent implements OnInit {
  isLoading: boolean = false;
  isResponseReady: boolean = false;
  isAppointmentActive: boolean = false;
  showPopup: boolean = false;

  selectedValue: number = 0;

  position: any = null;
  auto2Calculate!: AutoInsuranceRequest;
  healtk2Calculate!: HealthInsuranceRequest;
  quoteResponse!: QuoteResponse;
  popupMessage!: string;
  errorsTable: { field: string; step: number }[] = [];

  oneFormConfigurations: any = {
    data: [
      {
        label: 'VIN (Vehicle Identification Number)',
        type: 'text',
        required: true,
        placeholder: 'Enter 17-character VIN',
        regex: '^[A-HJ-NPR-Z0-9]{17}$',
        regexErrorMessage: 'Must be a valid 17-character VIN',
        step: 1,
        controleName: 'vin',
      },
      {
        label: 'License Number',
        type: 'text',
        required: true,
        placeholder: 'Enter your license number',
        regex: '^[A-Za-z0-9-]{6,20}$',
        regexErrorMessage: 'Invalid license number format',
        step: 1,
        controleName: 'licenseNumber',
      },
      {
        label: 'Driving Experience (years)',
        type: 'number',
        required: true,
        placeholder: 'Enter years of experience',
        regex: '^[0-9]{1,3}$',
        regexErrorMessage: 'Enter a valid number of years',
        step: 1,
        controleName: 'drivingExperience',
      },
      {
        label: 'Vehicle Type',
        type: 'select',
        required: true,
        selectOptions: ['Car', 'Motorcycle', 'Truck'],
        placeholder: 'Select vehicle type',
        step: 1,
        controleName: 'vehicleType',
      },
      {
        label: 'Vehicle Make',
        type: 'text',
        required: true,
        placeholder: 'Enter vehicle make',
        regex: '^[A-Za-z0-9\\s-]{2,50}$',
        regexErrorMessage: 'Invalid vehicle make',
        step: 1,
        controleName: 'vehicleMake',
      },
      {
        label: 'Vehicle Model',
        type: 'text',
        required: true,
        placeholder: 'Enter vehicle model',
        regex: '^[A-Za-z0-9\\s-]{2,50}$',
        regexErrorMessage: 'Invalid vehicle model',
        step: 1,
        controleName: 'vehicleModel',
      },
      {
        label: 'Accident History (past 3 years)',
        type: 'select',
        required: true,
        selectOptions: ['0 accidents', '1 accident', '2+ accidents'],
        placeholder: 'Select accident history',
        step: 1,
        controleName: 'accidentHistory',
      },
      {
        label: 'Traffic Violations',
        type: 'checkbox',
        required: false,
        selectOptions: ['Speeding', 'Running Red Light', 'DUI'],
        step: 1,
        controleName: 'trafficViolations',
      },
      {
        label: 'Defensive Driving Course',
        type: 'checkbox',
        required: false,
        step: 1,
        controleName: 'defensiveDrivingCourse',
      },
      {
        label: 'Coverage Type',
        type: 'select',
        required: true,
        selectOptions: ['Basic', 'Comprehensive', 'Third-Party'],
        placeholder: 'Select coverage type',
        step: 2,
        controleName: 'coverageType',
      },
      {
        label: 'Billing Period ',
        type: 'select',
        required: true,
        selectOptions: ['MONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL'],
        placeholder: 'Select coverage type',
        step: 2,
        controleName: 'billingPeriod',
      },
      {
        label: 'Location',
        type: 'map',
        placeholder: 'Select your governorate',
        step: 2,
        controleName: 'location',
      },
    ],
    nbrSteps: 2,
    getAdressAlso: true,
  };

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
          controleName: 'vin',
        },
        {
          label: 'License Number',
          type: 'text',
          required: true,
          placeholder: 'Enter your license number',
          regex: '^[A-Za-z0-9-]{6,20}$',
          regexErrorMessage: 'Invalid license number format',
          step: 1,
          controleName: 'licenseNumber',
        },
        {
          label: 'Driving Experience (years)',
          type: 'number',
          required: true,
          placeholder: 'Enter years of experience',
          regex: '^[0-9]{1,3}$',
          regexErrorMessage: 'Enter a valid number of years',
          step: 1,
          controleName: 'drivingExperience',
        },
        {
          label: 'Vehicle Type',
          type: 'select',
          required: true,
          selectOptions: ['Car', 'Motorcycle', 'Truck'],
          placeholder: 'Select vehicle type',
          step: 1,
          controleName: 'vehicleType',
        },
        {
          label: 'Vehicle Make',
          type: 'text',
          required: true,
          placeholder: 'Enter vehicle make',
          regex: '^[A-Za-z0-9\\s-]{2,50}$',
          regexErrorMessage: 'Invalid vehicle make',
          step: 1,
          controleName: 'vehicleMake',
        },
        {
          label: 'Vehicle Model',
          type: 'text',
          required: true,
          placeholder: 'Enter vehicle model',
          regex: '^[A-Za-z0-9\\s-]{2,50}$',
          regexErrorMessage: 'Invalid vehicle model',
          step: 1,
          controleName: 'vehicleModel',
        },
        {
          label: 'Accident History (past 3 years)',
          type: 'select',
          required: true,
          selectOptions: ['0 accidents', '1 accident', '2+ accidents'],
          placeholder: 'Select accident history',
          step: 1,
          controleName: 'accidentHistory',
        },
        {
          label: 'Traffic Violations',
          type: 'checkbox',
          required: false,
          selectOptions: ['Speeding', 'Running Red Light', 'DUI'],
          step: 1,
          controleName: 'trafficViolations',
        },
        {
          label: 'Defensive Driving Course',
          type: 'checkbox',
          required: false,
          step: 1,
          controleName: 'defensiveDrivingCourse',
        },
        {
          label: 'Coverage Type',
          type: 'select',
          required: true,
          selectOptions: ['Basic', 'Comprehensive', 'Third-Party'],
          placeholder: 'Select coverage type',
          step: 2,
          controleName: 'coverageType',
        },
        {
          label: 'Billing Period ',
          type: 'select',
          required: true,
          selectOptions: ['MONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL'],
          placeholder: 'Select coverage type',
          step: 2,
          controleName: 'billingPeriod',
        },
        {
          label: 'Location',
          type: 'map',
          placeholder: 'Select your governorate',
          step: 2,
          controleName: 'location',
        },
      ],
      nbrSteps: 2,
      getAdressAlso: true,
    },
    health: {
      data: [
        // Step 1: Personal Information + Basic Medical
        {
          label: 'Age',
          type: 'number',
          required: true,
          min: 0,
          max: 120,
          placeholder: 'Enter your age',
          regex: '^\\d{1,3}$',
          regexErrorMessage: 'Must be a valid age (0-120)',
          controleName: 'age',
          step: 1,
        },
        {
          label: 'Gender',
          type: 'select',
          required: true,
          selectOptions: ['Male', 'Female'],
          placeholder: 'Select gender',
          controleName: 'gender',
          step: 1,
        },
        {
          label: 'Governorate',
          type: 'select',
          required: true,
          selectOptions: [
            'Tunis',
            'Ariana',
            'Ben Arous',
            'Manouba',
            'Sousse',
            'Sfax',
            'Gabès',
            'Monastir',
            'Kasserine',
            'Gafsa',
            'Tataouine',
            'Médenine',
            'Kairouan',
            'Nabeul',
            'Bizerte',
            'Jendouba',
            'Béja',
            'Siliana',
            'Tozeur',
            'Kebili',
          ],
          placeholder: 'Select governorate',
          controleName: 'governorate',
          step: 1,
        },
        {
          label: 'Occupation',
          type: 'select',
          required: true,
          selectOptions: ['Office worker', 'Laborer', 'Student', 'Unemployed'],
          placeholder: 'Select occupation',
          controleName: 'occupation',
          step: 1,
        },
        {
          label: 'Pre-existing Conditions',
          type: 'checkbox-group',
          required: false,
          selectOptions: [
            'Diabetes',
            'Hypertension',
            'Heart Disease',
            'Cancer',
            'Asthma/COPD',
            'Other',
          ],
          controleName: 'preExistingConditions',
          step: 1,
        },
        {
          label: 'Family Medical History',
          type: 'checkbox-group',
          required: false,
          selectOptions: [
            'Diabetes',
            'Heart Disease',
            'Cancer',
            'Genetic Disorders',
          ],
          controleName: 'familyHistory',
          step: 1,
        },

        // Step 2: Detailed Medical + Lifestyle
        {
          label: 'Current Medications',
          type: 'textarea',
          required: false,
          placeholder: 'List current medications',
          controleName: 'medications',
          step: 2,
        },
        {
          label: 'Hospitalizations (Last 5 Years)',
          type: 'select',
          required: true,
          selectOptions: ['Yes', 'No'],
          placeholder: 'Select option',
          controleName: 'hospitalizations',
          step: 2,
        },
        {
          label: 'Chronic Illnesses',
          type: 'select',
          required: true,
          selectOptions: ['Yes', 'No'],
          placeholder: 'Select option',
          controleName: 'chronicIllnesses',
          step: 2,
        },
        {
          label: 'Surgeries (Last 5 Years)',
          type: 'select',
          required: true,
          selectOptions: ['Yes', 'No'],
          placeholder: 'Select option',
          controleName: 'surgeries',
          step: 2,
        },
        {
          label: 'Smoking Status',
          type: 'select',
          required: true,
          selectOptions: ['Yes', 'No'],
          placeholder: 'Select smoking status',
          controleName: 'smoking',
          step: 2,
        },
        {
          label: 'Alcohol Consumption',
          type: 'select',
          required: true,
          selectOptions: ['Never', 'Occasional', 'Regular'],
          placeholder: 'Select frequency',
          controleName: 'alcohol',
          step: 2,
        },
        {
          label: 'Exercise Frequency',
          type: 'select',
          required: true,
          selectOptions: ['Sedentary', '1–3x per week', '4–7x per week'],
          placeholder: 'Select frequency',
          controleName: 'exercise',
          step: 2,
        },
        {
          label: 'BMI',
          type: 'number',
          required: true,
          placeholder: 'Enter your BMI',
          min: 10,
          max: 50,
          regex: '^[1-4][0-9](\\.[0-9])?$',
          regexErrorMessage: 'Must be between 10.0 and 50.0',
          controleName: 'bmi',
          step: 2,
        },

        // Step 3: Coverage Preferences
        {
          label: 'Plan Type',
          type: 'select',
          required: true,
          selectOptions: ['Basic', 'Comprehensive', 'Premium'],
          placeholder: 'Select plan type',
          controleName: 'planType',
          step: 3,
        },
        {
          label: 'Deductible',
          type: 'select',
          required: true,
          selectOptions: [500, 1000, 2000],
          placeholder: 'Select deductible',
          controleName: 'deductible',
          step: 3,
        },
        {
          label: 'Add-Ons',
          type: 'checkbox-group',
          required: false,
          selectOptions: [
            'Dental',
            'Vision',
            'Maternity/Paternity',
            'Mental Health',
            'Critical Illness',
            'International',
          ],
          controleName: 'addOns',
          step: 3,
        },
        // Step 4: Additional Information + Consent
        {
          label: 'Travel Frequency',
          type: 'select',
          required: true,
          selectOptions: ['Rarely', '1–2x/year', 'Monthly'],
          placeholder: 'Select frequency',
          controleName: 'travelFrequency',
          step: 4,
        },
        {
          label: 'Vaccination Status',
          type: 'checkbox-group',
          required: false,
          selectOptions: ['Flu', 'COVID-19', 'Hepatitis B', 'MMR','Tuberculosis'],
          controleName: 'vaccinations',
          step: 4,
        },
        {
          label: 'GDPR Consent',
          type: 'checkbox',
          required: true,
          controleName: 'gdprConsent',
          step: 4,
        },
      ],
      nbrSteps: 4,
      getAdressAlso: false,
    },
    home: {
      data: [
        {
          label: 'Property Address',
          type: 'map',
          placeholder: 'Select your Property Address',
          step: 1,
          controleName: 'propertyAddress',
        },
        {
          label: 'Property Type',
          type: 'select',
          required: true,
          selectOptions: ['Apartment', 'House', 'Villa', 'Commercial'],
          placeholder: 'Select property type',
          step: 1,
          controleName: 'propertyType',
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
          step: 1,
          controleName: 'squareFootage',
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
          step: 1,
          controleName: 'yearBuilt',
        },
        {
          label: 'Coverage Type',
          type: 'select',
          required: true,
          selectOptions: ['Basic', 'Extended', 'Premium'],
          placeholder: 'Select coverage type',
          step: 2,
          controleName: 'homeCoverageType',
        },
        {
          label: 'Include Flood Insurance',
          type: 'checkbox',
          required: false,
          step: 2,
          controleName: 'includeFloodInsurance',
        },
        {
          label: 'Include Earthquake Coverage',
          type: 'checkbox',
          required: false,
          step: 2,
          controleName: 'includeEarthquakeCoverage',
        },
        {
          label: 'Estimated Property Value (TND)',
          type: 'number',
          required: true,
          placeholder: 'Enter property value',
          regex: '^\\d{5,7}$',
          regexErrorMessage: 'Must be a valid amount (5-7 digits)',
          step: 2,
          controleName: 'estimatedPropertyValue',
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
          step: 2,
          controleName: 'securityFeatures',
        },
      ],
      nbrSteps: 2,
      getAdressAlso: true,
    },
    life: {
      data: [
        {
          label: 'Desired Coverage Amount (TND)',
          type: 'number',
          required: true,
          placeholder: 'Enter coverage amount',
          min: 10000,
          max: 1000000,
          regex: '^\\d{5,7}$',
          regexErrorMessage: 'Must be a valid amount (5-7 digits)',
          step: 1,
          controleName: 'coverageAmount',
        },
        {
          label: 'Term Length',
          type: 'select',
          required: true,
          selectOptions: ['10 Years', '20 Years', '30 Years'],
          placeholder: 'Select term length',
          step: 1,
          controleName: 'termLength',
        },
        {
          label: 'Include Critical Illness',
          type: 'checkbox',
          required: false,
          step: 1,
          controleName: 'includeCriticalIllness',
        },
        {
          label: 'Smoker',
          type: 'radio',
          required: true,
          selectOptions: ['Yes', 'No'],
          step: 1,
          controleName: 'smoker',
        },
        {
          label: 'Dangerous Occupation',
          type: 'checkbox',
          required: false,
          step: 1,
          controleName: 'dangerousOccupation',
        },
      ],
      nbrSteps: 1,
      getAdressAlso: false,
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
    private autoInsuranceService: AutomobileQuoteControllerService,
    private healthInsuranceService: HealthQuoteControllerService,
    private storageService: StorageService
  ) {}

  ngOnInit() {}

  changeFormType(formType: string): void {
    if (!this.isLoading)
      if (formType !== this.currentFormType) {
        this.currentFormType = formType;
        this.oneFormConfigurations = {
          ...this.formConfigurations[this.currentFormType],
        };
      }
  }

  recieveFormData(formData: any) {
    const objList = this._initiateLoading(formData.data);
    switch (this.currentFormType) {
      case 'auto':
        this.submitAutoData(objList, formData.position);
        break;
      case 'health':
        this.submitHeatlhData(objList);
        break;
      default:
        console.log(formData);
        break;
    }
  }

  private _initiateLoading(formData: any): any {
    this.showPopup = true;
    this.isLoading = true;
    let temp: any[] = [];
    Object.entries(formData).forEach(([key, value]) => temp.push(value));
    return temp;
  }

  submitHeatlhData(objList: any) {
    this.healtk2Calculate = {
      age: objList[0],
      gender: objList[1],
      governorate: objList[2],
      occupation: objList[3],
      preExistingConditions: objList[4],
      familyHistory: objList[5],
      medications: objList[6],
      hospitalizations: objList[7],
      chronicIllnesses: objList[8],
      surgeries: objList[9],
      smoking: objList[10],
      alcohol: objList[11],
      exercise: objList[12],
      bmi: objList[13],
      planType: objList[14],
      deductible: objList[15],
      addOns: objList[16],
      existingInsurance: objList[17],
      employerInsurance: objList[18],
      travelFrequency: objList[19],
      vaccinations: objList[20],
      gdprConsent: objList[21] || false,
    };

    console.log(this.healtk2Calculate);
    this.storageService.set(this.currentFormType, this.healtk2Calculate);
    this._calculateHealth();
  }

  private _calculateHealth() {
    this.isLoading = true;
    this.healthInsuranceService
      .calculateHealth({ body: this.healtk2Calculate })
      .subscribe(this.handleResponse());
  }

  submitAutoData(objList: any, position: any) {
    this.auto2Calculate = {
      vin: objList[0],
      licenseNumber: objList[1],
      drivingExperience: objList[2],
      vehicleType: objList[3],
      vehicleMake: objList[4],
      vehicleModel: objList[5],
      accidentHistory: objList[6],
      trafficViolations: objList[7] || false,
      defensiveDrivingCourse: objList[8] || false,
      coverageType: objList[9],
      addressInfo: position,
      billingPeriod: objList[10],
    };
    console.log(this.auto2Calculate);
    this.storageService.set(this.currentFormType, this.auto2Calculate);
    this._calculateAuto();
  }

  private _calculateAuto() {
    this.isLoading = true;
    this.autoInsuranceService
      .calculate({ body: this.auto2Calculate })
      .subscribe(this.handleResponse());
  }

  newQuote() {
    this.isLoading = false;
    this.isResponseReady = false;
  }

  makeAppointment() {
    this.isAppointmentActive = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  handleResponse() {
    return {
      next: (response: QuoteResponse) => {
        this.isResponseReady = true;
        this.popupMessage = 'The Quote Is generated Successfuly';
        this.quoteResponse = response;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorsTable = [];
        this.isLoading = false;
        this.isResponseReady = false;

        const message =
          err?.error?.['error: '] || 'An unexpected error occurred.';
        const words = message.split(' ');
        const secondWord = words[1] || '';

        if (['model', 'make', 'type'].includes(secondWord.toLowerCase())) {
          let controleName = words[0] + secondWord;
          this.errorsTable.push({ field: controleName, step: 1 });
          this.errorsTable = [...this.errorsTable];
        }

        this.popupMessage = message;
      },
    };
  }
}
