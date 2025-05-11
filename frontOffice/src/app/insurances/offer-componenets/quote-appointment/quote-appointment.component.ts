import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { StorageService } from 'src/app/core/services/offer/storage.service';
import { AutoInsuranceRequest } from 'src/app/core/models/offer/auto-insurance-request';
import { AppointmentControllerService } from 'src/app/core/services/offer/appointment-controller.service';
import { AppointmentDto } from 'src/app/core/models/offer/appointment-dto';

@Component({
  selector: 'app-quote-appointment',
  templateUrl: './quote-appointment.component.html',
  styleUrls: ['../../form.css', './quote-appointment.component.css'],
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
    trigger('fadeOut', [
      transition(':leave', [animate('400ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class QuoteAppointmentComponent implements OnInit {
  @Input() currentAppointementInsuranceType!: string;

  selectedValue: number = 0;
  popupMessage!: string;
  errorsTable: { field: string; step: number }[] = [];

  oneFormConfigurations: any = {
    data: [
      {
        label: 'First Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your first name',
        regex: '^[A-Za-z]+$',
        regexErrorMessage: 'Only alphabetic characters are allowed',
        step: 1,
        controleName: 'firstName', // Add a controleName for form control binding
      },
      {
        label: 'Last Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your last name',
        regex: '^[A-Za-z]+$',
        regexErrorMessage: 'Only alphabetic characters are allowed',
        step: 1,
        controleName: 'lastName',
      },
      {
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'Enter your email address',
        regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        regexErrorMessage: 'Enter a valid email address',
        step: 1,
        controleName: 'email',
      },
      {
        label: 'Phone Number',
        type: 'number',
        required: true,
        placeholder: 'Enter your phone number',
        regex: '^[0-9]{8,15}$',
        regexErrorMessage: 'Phone number must be between 8 and 15 digits',
        step: 1,
        controleName: 'phone',
      },
      {
        label: 'Date of Birth',
        type: 'date',
        required: true,
        placeholder: 'Select your date of birth',
        step: 1,
        controleName: 'dob',
      },
      {
        label: 'CIN',
        type: 'text',
        required: true,
        placeholder: 'Enter your CIN',
        regex: '^[0-9]{8}$',
        regexErrorMessage: 'CIN must be exactly 8 digits',
        step: 1,
        controleName: 'cin',
      },
      // {
      //   label: 'CIN Document',
      //   controleName: 'cinDocuments',
      //   type: 'file',
      //   required: true,
      //   step: 1,
      // },
    ],
    nbrSteps: 1,
    getAdressAlso: false,
  };

  formConfigurations: any = {
    auto: {
      data: [
        {
          label: 'First Name',
          type: 'text',
          required: true,
          placeholder: 'Enter your first name',
          regex: '^[A-Za-z]+$',
          regexErrorMessage: 'Only alphabetic characters are allowed',
          order: 1,
          step: 1,
        },
        {
          label: 'Last Name',
          type: 'text',
          required: true,
          placeholder: 'Enter your last name',
          regex: '^[A-Za-z]+$',
          regexErrorMessage: 'Only alphabetic characters are allowed',
          order: 2,
          step: 1,
        },
        {
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'Enter your email address',
          regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          regexErrorMessage: 'Enter a valid email address',
          order: 3,
          step: 1,
        },
        {
          label: 'Phone Number',
          type: 'number',
          required: true,
          placeholder: 'Enter your phone number',
          regex: '^[0-9]{8,15}$',
          regexErrorMessage: 'Phone number must be between 8 and 15 digits',
          order: 4,
          step: 1,
        },
        {
          label: 'Date of Birth',
          type: 'date',
          required: true,
          placeholder: 'Select your date of birth',
          order: 5,
          step: 1,
        },
        {
          label: 'CIN',
          type: 'text',
          required: true,
          placeholder: 'Enter your CIN',
          regex: '^[0-9]{8}$',
          regexErrorMessage: 'CIN must be exactly 8 digits',
          order: 6,
          step: 1,
        },
      ],
      nbrSteps: 1,
      getAdressAlso: false,
    },
    health: {
      data: [
        {
          label: 'Annual Income (TND)',
          type: 'number',
          required: true,
          placeholder: 'Enter your annual income',
          min: 0,
          max: 1000000,
          regex: '^\\d{4,7}$',
          regexErrorMessage: 'Must be a valid amount (4-7 digits)',
          step: 1,
          controleName: 'annualIncome',
        },
        {
          label: 'Coverage Type',
          type: 'select',
          required: true,
          selectOptions: ['Basic', 'Standard', 'Premium'],
          placeholder: 'Select coverage type',
          step: 1,
          controleName: 'healthCoverageType',
        },
        {
          label: 'Existing Conditions',
          type: 'checkbox-group',
          required: false,
          selectOptions: ['Diabetes', 'Hypertension', 'Heart Disease', 'None'],
          step: 1,
          controleName: 'existingConditions',
        },
        {
          label: 'Include Dental Coverage',
          type: 'checkbox',
          required: false,
          step: 1,
          controleName: 'includeDentalCoverage',
        },
        {
          label: 'Include Optical Coverage',
          type: 'checkbox',
          required: false,
          step: 1,
          controleName: 'includeOpticalCoverage',
        },
      ],
      nbrSteps: 1,
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

  quotesHistory: { key: string; obj: AutoInsuranceRequest }[] = [];
  constructor(
    private storageService: StorageService,
    private appointmentService: AppointmentControllerService
  ) {}

  ngOnInit(): void {
    this.quotesHistory = this.storageService.get<AutoInsuranceRequest>(
      this.currentAppointementInsuranceType
    );
  }

  deleteQuote(key: string) {
    this.storageService.remove(key);
    this.quotesHistory = this.quotesHistory.filter((q) => q.key !== key);
  }

  makeAutoReservation(data: any) {
    const autoAppointment: AppointmentDto = data.data as AppointmentDto;
    autoAppointment.cin = Number(autoAppointment.cin);
    autoAppointment.phone = Number(autoAppointment.phone);
    autoAppointment.dob = this.formatDateToISO(autoAppointment.dob);

    console.log(autoAppointment);
    this.appointmentService
      .save({ body: autoAppointment })
      .subscribe((response) => {
        console.log(response);
      });
  }



  recieveFormData(data: any) {
    switch (this.currentAppointementInsuranceType) {
      case 'auto':
        this.makeAutoReservation(data);
        break;
      default:
        console.log(data);
        break;
    }
  }


  private formatDateToISO(date: any): string {

    if (!date) date = new Date();

    if (typeof date === 'string' && date.includes('T')) return date;
    
    if (date instanceof Date) return date.toISOString();

    if (typeof date === 'string') {
      const parsedDate = new Date(date);
      return parsedDate.toISOString();
    }

    return new Date(date).toISOString();
  }
}
