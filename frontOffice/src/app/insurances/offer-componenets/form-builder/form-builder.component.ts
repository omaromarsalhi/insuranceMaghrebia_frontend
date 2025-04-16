import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { MyFormFieldDto } from 'src/app/core/models/offer/my-form-field';
import { AddressInfo } from 'src/app/core/models/offer/address-info';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: [
    '../../nice-select.css',
    '../../form.css',
    './form-builder.component.css',
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
export class FormBuilderComponent implements OnInit, OnChanges {
  @Input() formConfigurations: any;
  @Input() isAiExplainerOn: boolean = true;
  @Input() iNeedAdress: boolean = false;
  @Input() errorsTable: { field: string; step: number }[] = [];
  @Output() formdata = new EventEmitter<{
    data: any;
    position?: AddressInfo;
    licenceId: any;
  }>();
  @Output() aiExplainerData = new EventEmitter<{
    factor: any;
    value: any;
    condition: string;
  }>();

  private aiExplainerString = new Subject<{
    factor: any;
    value: any;
    condition: string;
  }>();

  isInitFinished: boolean = false;

  insuranceForm!: FormGroup;
  isFormSubmitted: boolean = false;
  selectedValue: number = 0;
  step: number = 1;
  maxSteps: number = 1;
  showMap: boolean = false;
  position: any = null;
  popupMessage!: string;
  previewFront: string | null = null;
  previewBack: string | null = null;

  filteredFormFields: MyFormFieldDto[] = [];
  chosenFormFields: any[] = [];
  allowedField2Explain = [
    'drivingExperience',
    'accidentHistory',
    'trafficViolations',
    'defensiveDrivingCourse',
    'coverageType',
    'vehicleType',
  ];
  allowedField2ExplaiWithCondition = ['vin'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.insuranceForm = this.fb.group({});
    this.initializeForm();
    this.isInitFinished = true;
    if (this.isAiExplainerOn) this.setAiExplainer();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['errorsTable'] && this.errorsTable.length > 0) {
      this.checkErros();
    }

    if (changes['formConfigurations'] && this.isInitFinished) {
      this.clearAllControls();
      this.initializeForm();
    }
  }

  private setAiExplainer() {
    this.aiExplainerString
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((fieldValue) => {
        this.aiExplainerData.emit(fieldValue);
      });
  }

  onUserInput(event: Event, fieldName: string) {
    const value = this.insuranceForm.get(fieldName)?.value;
    console.log(value);
    if (this.allowedField2Explain.includes(fieldName))
      this.aiExplainerString.next({
        factor: fieldName,
        value: value,
        condition: 'no_preprocessing',
      });
    else if (this.allowedField2ExplaiWithCondition.includes(fieldName))
      this.aiExplainerString.next({
        factor: fieldName,
        value: value,
        condition: 'preprocessing',
      });
  }

  initializeForm(): void {
    this.chosenFormFields = this.formConfigurations.data;
    this.step = 1;
    this.maxSteps = this.formConfigurations.nbrSteps;
    this.createFormControls();
    this.filteredFields();
  }

  createFormControls(): void {
    if (!this.insuranceForm) {
      console.error('insuranceForm is not initialized');
      return;
    }

    this.chosenFormFields.forEach((field: any) => {
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

      if (field.type === 'checkbox-group') {
        const formArray = this.fb.array(
          field.selectOptions!.map(() => this.fb.control(''))
        );
        this.insuranceForm.addControl(field.controleName, formArray);
      } else {
        // Standard FormControl for other types
        this.insuranceForm.addControl(
          field.controleName,
          this.fb.control('', validators)
        );
      }
    });
  }

  filteredFields() {
    this.filteredFormFields = this.chosenFormFields.filter(
      (field) => field.step === this.step
    );
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

  trackByFieldName(index: number, item: MyFormFieldDto): string {
    return item.controleName;
  }

  onSubmit() {
    // const mockFormData = {
    //   age: '30',
    //   gender: 'Female',
    //   governorate: 'Sfax',
    //   occupation: 'Office worker',
    //   preExistingConditions: ['Diabetes', 'Asthma/COPD'],
    //   familyHistory: ['Heart Disease'],
    //   medications: 'Metformin',
    //   hospitalizations: 'No',
    //   chronicIllnesses: 'Yes',
    //   surgeries: 'No',
    //   smoking: 'No',
    //   alcohol: 'Occasional',
    //   exercise: '1–3x per week',
    //   bmi: '24.5',
    //   planType: 'Comprehensive',
    //   deductible: 1000 ,
    //   addOns: ['Dental', 'Mental Health'],
    //   existingInsurance: 'Yes',
    //   employerInsurance: 'No',
    //   travelFrequency: '1–2x/year',
    //   vaccinations: ['Flu', 'COVID-19'],
    //   gdprConsent: true,
    // };
    // console.log(this.insuranceForm.value);

    this.isFormSubmitted = true;
    if (this.iNeedAdress && !this.position) return;
    if (this.insuranceForm.valid) {
    const list = this.insuranceForm.value;
    this.formdata.emit({
      data: list,
      position: this.iNeedAdress ? (this.position as AddressInfo) : undefined,
      licenceId:
        this.previewFront && this.previewBack
          ? { front: this.previewFront, back: this.previewBack }
          : undefined,
    });
    }
    this.isFormSubmitted = false;
  }

  cleanForm() {
    this.insuranceForm.reset();
  }

  getCurrentValue(field: MyFormFieldDto): number {
    const controlName = field.controleName;
    return this.insuranceForm.get(controlName)?.value || field.rangeStart;
  }

  updateRangeValue(field: MyFormFieldDto, event: Event): void {
    const controlName = field.controleName;
    const value = (event.target as HTMLInputElement).value;
    this.insuranceForm.get(controlName)?.setValue(value);
  }

  toggleMap() {
    this.showMap = !this.showMap;
  }

  getPosition(data: any, fieldName: string) {
    if (this.isAiExplainerOn)
      this.aiExplainerString.next({
        factor: fieldName,
        value: data,
        condition: 'preprocessing',
      });
    this.position = data;
  }

  onCheckboxChange(event: any, controlName: string, option: string) {
    const formArray: FormArray = this.insuranceForm.get(
      controlName
    ) as FormArray;

    if (event.target.checked) {
      if (!formArray.value.includes(option)) {
        formArray.push(new FormControl(option));
      }
    } else {
      const index = formArray.controls.findIndex((x) => x.value === option);
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }

  isChecked(controlName: string, option: string): boolean {
    const formArray: FormArray = this.insuranceForm.get(
      controlName
    ) as FormArray;
    return formArray?.value?.includes(option);
  }

  clearVariables() {
    this.isFormSubmitted = false;
  }

  checkErros() {
    this.errorsTable.forEach((error) => {
      if (
        this.insuranceForm.controls[error.field] &&
        this.step === error.step
      ) {
        setTimeout(() => {
          this.insuranceForm.controls[error.field].setErrors({
            incorrect: true,
          });
          this.insuranceForm.controls[error.field].markAsTouched();
          this.errorsTable = this.errorsTable.filter(
            (err) => err.field != error.field
          );
        });
      }
    });
  }

  clearAllControls() {
    if (this.insuranceForm && this.insuranceForm.controls)
      Object.keys(this.insuranceForm.controls).forEach((controlName) => {
        this.insuranceForm.removeControl(controlName);
      });
  }

  onFileSelected(event: Event, side: 'cinFront' | 'cinBack'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.insuranceForm.get(side)?.setValue(file);

      const reader = new FileReader();
      reader.onload = () => {
        if (side === 'cinFront') {
          this.previewFront = reader.result as string;
        } else {
          this.previewBack = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(side: 'cinFront' | 'cinBack'): void {
    if (side === 'cinFront') {
      this.previewFront = null;
    } else {
      this.previewBack = null;
    }
    this.insuranceForm.get(side)?.setValue(null);
    this.insuranceForm.get(side)?.markAsTouched();
  }

  showValidationError(controlName: string): boolean | undefined {
    const control = this.insuranceForm.get(controlName);
    return (
      (control?.invalid && control.touched) ||
      (control?.invalid && this.isFormSubmitted)
    );
  }
}

// // Get all invalid fields
// Object.keys(this.insuranceForm.controls).forEach((key) => {
//   const controlErrors = this.insuranceForm.get(key)?.errors;
//   if (controlErrors) {
//     console.log('Field:', key, 'Errors:', controlErrors);
//   }
// });
// {
//   label: 'First Name',
//   type: 'text',
//   required: true,
//   placeholder: 'Enter your first name',
//   regex: '^[A-Za-z]+$',
//   regexErrorMessage: 'Only alphabetic characters are allowed',
//   order: 1,
//   step: 1,
// },
// {
//   label: 'Last Name',
//   type: 'text',
//   required: true,
//   placeholder: 'Enter your last name',
//   regex: '^[A-Za-z]+$',
//   regexErrorMessage: 'Only alphabetic characters are allowed',
//   order: 2,
//   step: 1,
// },
// {
//   label: 'Email',
//   type: 'email',
//   required: true,
//   placeholder: 'Enter your email address',
//   regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
//   regexErrorMessage: 'Enter a valid email address',
//   order: 3,
//   step: 1,
// },
// {
//   label: 'Phone Number',
//   type: 'number',
//   required: true,
//   placeholder: 'Enter your phone number',
//   regex: '^[0-9]{8,15}$',
//   regexErrorMessage: 'Phone number must be between 8 and 15 digits',
//   order: 4,
//   step: 1,
// },
// {
//   label: 'Date of Birth',
//   type: 'date',
//   required: true,
//   placeholder: 'Select your date of birth',
//   order: 5,
//   step: 1,
// },
// {
//   label: 'CIN',
//   type: 'text',
//   required: true,
//   placeholder: 'Enter your CIN',
//   regex: '^[0-9]{8}$',
//   regexErrorMessage: 'CIN must be exactly 8 digits',
//   order: 6,
//   step: 1,
// },
// formConfigurations: any = {
//   auto: {
//     data: [
//       {
//         label: 'VIN (Vehicle Identification Number)',
//         type: 'text',
//         required: true,
//         placeholder: 'Enter 17-character VIN',
//         regex: '^[A-HJ-NPR-Z0-9]{17}$',
//         regexErrorMessage: 'Must be a valid 17-character VIN',
//         step: 1,
//       },
//       {
//         label: 'License Number',
//         type: 'text',
//         required: true,
//         placeholder: 'Enter your license number',
//         regex: '^[A-Za-z0-9-]{6,20}$',
//         regexErrorMessage: 'Invalid license number format',
//         step: 1,
//       },
//       {
//         label: 'Driving Experience (years)',
//         type: 'number',
//         required: true,
//         placeholder: 'Enter years of experience',
//         regex: '^[0-9]{1,3}$',
//         regexErrorMessage: 'Enter a valid number of years',
//         step: 1,
//       },
//       {
//         label: 'Vehicle Type',
//         type: 'select',
//         required: true,
//         selectOptions: ['Car', 'Motorcycle', 'Truck'],
//         placeholder: 'Select vehicle type',
//         order: 9,
//         step: 1,
//       },
//       {
//         label: 'Vehicle Make',
//         type: 'text',
//         required: true,
//         placeholder: 'Enter vehicle make',
//         regex: '^[A-Za-z0-9\\s-]{2,50}$',
//         regexErrorMessage: 'Invalid vehicle make',
//         order: 10,
//         step: 1,
//       },
//       {
//         label: 'Vehicle Model',
//         type: 'text',
//         required: true,
//         placeholder: 'Enter vehicle model',
//         regex: '^[A-Za-z0-9\\s-]{2,50}$',
//         regexErrorMessage: 'Invalid vehicle model',
//         order: 11,
//         step: 1,
//       },
//       {
//         label: 'Accident History (past 3 years)',
//         type: 'select',
//         required: true,
//         selectOptions: ['0 accidents', '1 accident', '2+ accidents'],
//         placeholder: 'Select accident history',
//         order: 12,
//         step: 1,
//       },
//       {
//         label: 'Traffic Violations',
//         type: 'checkbox',
//         required: false,
//         selectOptions: ['Speeding', 'Running Red Light', 'DUI'],
//         order: 13,
//         step: 1,
//       },
//       {
//         label: 'Defensive Driving Course',
//         type: 'checkbox',
//         required: false,
//         order: 14,
//         step: 1,
//       },
//       {
//         label: 'Coverage Type',
//         type: 'select',
//         required: true,
//         selectOptions: ['Basic', 'Comprehensive', 'Third-Party'],
//         placeholder: 'Select coverage type',
//         order: 15,
//         step: 2,
//       },
//       {
//         label: 'Billing Period ',
//         type: 'select',
//         required: true,
//         selectOptions: ['MONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL'],
//         placeholder: 'Select coverage type',
//         step: 2,
//       },
//       {
//         label: 'Location',
//         type: 'map',
//         placeholder: 'Select your governorate',
//         step: 2,
//       },
//     ],
//     nbrSteps: 2,
//   },
//   health: {
//     data: [
//       // Step 1: Personal Information
//       // {
//       //   label: 'Full Name',
//       //   type: 'text',
//       //   required: true,
//       //   placeholder: 'Enter your full name',
//       //   regex: '^[A-Za-z\\s]{2,}$',
//       //   regexErrorMessage: 'Must contain at least 2 alphabetical characters',
//       //   order: 1,
//       //   step: 1
//       // },
//       // {
//       //   label: 'Date of Birth',
//       //   type: 'date',
//       //   required: true,
//       //   placeholder: 'Select your date of birth',
//       //   minDate: '1900-01-01',
//       //   maxDate: new Date().toISOString().split('T')[0],
//       //   order: 2,
//       //   step: 1
//       // },
//       // {
//       //   label: 'CIN',
//       //   type: 'text',
//       //   required: true,
//       //   placeholder: 'Enter your CIN',
//       //   regex: '^[0-9]{8}$',
//       //   regexErrorMessage: 'CIN must be exactly 8 digits',
//       //   order: 3,
//       //   step: 1
//       // },
//       // {
//       //   label: 'Phone Number',
//       //   type: 'tel',
//       //   required: true,
//       //   placeholder: 'Enter your phone number',
//       //   regex: '^[0-9]{8,15}$',
//       //   regexErrorMessage: 'Phone number must be 8-15 digits',
//       //   order: 4,
//       //   step: 1
//       // },
//       // {
//       //   label: 'Email',
//       //   type: 'email',
//       //   required: true,
//       //   placeholder: 'Enter your email',
//       //   regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
//       //   regexErrorMessage: 'Enter a valid email address',
//       //   order: 5,
//       //   step: 1
//       // },

//       // Step 2: Health Information
//       {
//         label: 'Annual Income (TND)',
//         type: 'number',
//         required: true,
//         placeholder: 'Enter your annual income',
//         min: 0,
//         max: 1000000,
//         regex: '^\\d{4,7}$',
//         regexErrorMessage: 'Must be a valid amount (4-7 digits)',
//         order: 6,
//         step: 1,
//       },
//       {
//         label: 'Coverage Type',
//         type: 'select',
//         required: true,
//         selectOptions: ['Basic', 'Standard', 'Premium'],
//         placeholder: 'Select coverage type',
//         order: 7,
//         step: 1,
//       },
//       {
//         label: 'Existing Conditions',
//         type: 'checkbox-group',
//         required: false,
//         selectOptions: ['Diabetes', 'Hypertension', 'Heart Disease', 'None'],
//         order: 8,
//         step: 1,
//       },
//       {
//         label: 'Include Dental Coverage',
//         type: 'checkbox',
//         required: false,
//         order: 9,
//         step: 1,
//       },
//       {
//         label: 'Include Optical Coverage',
//         type: 'checkbox',
//         required: false,
//         order: 10,
//         step: 1,
//       },
//     ],
//     nbrSteps: 1,
//   },
//   home: {
//     data: [
//       {
//         label: 'Property Address',
//         type: 'map',
//         placeholder: 'Select your Property Address',
//         order: 1,
//         step: 1,
//       },
//       {
//         label: 'Property Type',
//         type: 'select',
//         required: true,
//         selectOptions: ['Apartment', 'House', 'Villa', 'Commercial'],
//         placeholder: 'Select property type',
//         order: 3,
//         step: 1,
//       },
//       {
//         label: 'Square Footage (m²)',
//         type: 'number',
//         required: true,
//         placeholder: 'Enter area in square meters',
//         min: 10,
//         max: 1000,
//         regex: '^\\d{2,5}$',
//         regexErrorMessage: 'Must be a valid area (10-99999 m²)',
//         order: 4,
//         step: 1,
//       },
//       {
//         label: 'Year Built',
//         type: 'number',
//         required: true,
//         placeholder: 'Enter construction year',
//         min: 1900,
//         max: new Date().getFullYear(),
//         regex: '^(19|20)\\d{2}$',
//         regexErrorMessage:
//           'Enter a valid year between 1900-' + new Date().getFullYear(),
//         order: 5,
//         step: 1,
//       },
//       {
//         label: 'Coverage Type',
//         type: 'select',
//         required: true,
//         selectOptions: ['Basic', 'Extended', 'Premium'],
//         placeholder: 'Select coverage type',
//         order: 6,
//         step: 2,
//       },
//       {
//         label: 'Include Flood Insurance',
//         type: 'checkbox',
//         required: false,
//         order: 7,
//         step: 2,
//       },
//       {
//         label: 'Include Earthquake Coverage',
//         type: 'checkbox',
//         required: false,
//         order: 8,
//         step: 2,
//       },
//       {
//         label: 'Estimated Property Value (TND)',
//         type: 'number',
//         required: true,
//         placeholder: 'Enter property value',
//         min: 10000,
//         max: 5000000,
//         regex: '^\\d{5,7}$',
//         regexErrorMessage: 'Must be a valid amount (5-7 digits)',
//         order: 9,
//         step: 2,
//       },
//       {
//         label: 'Security Features',
//         type: 'checkbox-group',
//         required: false,
//         selectOptions: [
//           'Alarm System',
//           'Security Cameras',
//           'Gated Community',
//           'None',
//         ],
//         order: 10,
//         step: 2,
//       },
//     ],
//     nbrSteps: 2,
//   },
//   life: {
//     data: [
//       // Step 1: Personal Information
//       // {
//       //   label: 'Full Name',
//       //   type: 'text',
//       //   required: true,
//       //   placeholder: 'Enter your full name',
//       //   regex: '^[A-Za-z\\s]{2,}$',
//       //   regexErrorMessage: 'Must contain at least 2 alphabetical characters',
//       //   order: 1,
//       //   step: 1
//       // },
//       // {
//       //   label: 'Date of Birth',
//       //   type: 'date',
//       //   required: true,
//       //   placeholder: 'Select your date of birth',
//       //   minDate: '1900-01-01',
//       //   maxDate: new Date().toISOString().split('T')[0],
//       //   order: 2,
//       //   step: 1
//       // },
//       // {
//       //   label: 'CIN',
//       //   type: 'text',
//       //   required: true,
//       //   placeholder: 'Enter your CIN',
//       //   regex: '^[0-9]{8}$',
//       //   regexErrorMessage: 'CIN must be exactly 8 digits',
//       //   order: 3,
//       //   step: 1
//       // },
//       // {
//       //   label: 'Email',
//       //   type: 'email',
//       //   required: true,
//       //   placeholder: 'Enter your email',
//       //   regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
//       //   regexErrorMessage: 'Enter a valid email address',
//       //   order: 4,
//       //   step: 1
//       // },
//       // {
//       //   label: 'Phone Number',
//       //   type: 'tel',
//       //   required: true,
//       //   placeholder: 'Enter your phone number',
//       //   regex: '^[0-9]{8,15}$',
//       //   regexErrorMessage: 'Phone number must be 8-15 digits',
//       //   order: 5,
//       //   step: 1
//       // },

//       // Step 2: Policy Details
//       {
//         label: 'Desired Coverage Amount (TND)',
//         type: 'number',
//         required: true,
//         placeholder: 'Enter coverage amount',
//         min: 10000,
//         max: 1000000,
//         regex: '^\\d{5,7}$',
//         regexErrorMessage: 'Must be a valid amount (5-7 digits)',
//         order: 6,
//         step: 1,
//       },
//       {
//         label: 'Term Length',
//         type: 'select',
//         required: true,
//         selectOptions: ['10 Years', '20 Years', '30 Years'],
//         placeholder: 'Select term length',
//         order: 7,
//         step: 1,
//       },
//       {
//         label: 'Include Critical Illness',
//         type: 'checkbox',
//         required: false,
//         order: 8,
//         step: 1,
//       },
//       {
//         label: 'Smoker',
//         type: 'radio',
//         required: true,
//         selectOptions: ['Yes', 'No'],
//         order: 9,
//         step: 1,
//       },
//       {
//         label: 'Dangerous Occupation',
//         type: 'checkbox',
//         required: false,
//         order: 10,
//         step: 1,
//       },
//     ],
//     nbrSteps: 1,
//   },
// };

// formTypes = [
//   { id: 'auto', label: 'Auto', icon: 'fas fa-car' },
//   { id: 'health', label: 'Health', icon: 'fas fa-heartbeat' },
//   { id: 'home', label: 'Home', icon: 'fas fa-home' },
//   { id: 'life', label: 'Life', icon: 'fas fa-umbrella' },
// ];
