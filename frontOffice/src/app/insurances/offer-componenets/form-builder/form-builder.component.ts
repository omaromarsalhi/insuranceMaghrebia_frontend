import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormFieldDto } from 'src/app/core/models';

import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { MyFormFieldDto } from 'src/app/core/models/my-form-field';

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
export class FormBuilderComponent implements OnInit {
  formId!: string;
  offerId!: string;
  insuranceForm!: FormGroup;
  isLoading: boolean = false;
  notValid: boolean = false;
  selectedValue: number = 0;
  showPopup = false;
  step: number = 3;
  showMap: boolean = false;

  filteredFormFields: MyFormFieldDto[] = [];
  formFields: MyFormFieldDto[] = [
    // Step 1: Personal Information
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

    // Step 2: Driver & Vehicle Info
    {
      label: 'License Number',
      type: 'text',
      required: true,
      placeholder: 'Enter your license number',
      regex: '^[A-Za-z0-9-]+$',
      regexErrorMessage: 'Invalid license number format',
      order: 7,
      step: 2,
    },
    {
      label: 'Driving Experience (years)',
      type: 'number',
      required: true,
      placeholder: 'Enter years of experience',
      rangeStart: 0,
      rangeEnd: 100,
      rangeValid: true,
      order: 8,
      step: 2,
    },
    {
      label: 'Vehicle Type',
      type: 'select',
      required: true,
      selectOptions: ['Car', 'Motorcycle', 'Truck'],
      placeholder: 'Select vehicle type',
      order: 9,
      step: 2,
    },
    {
      label: 'Vehicle Make',
      type: 'select',
      required: true,
      selectOptions: ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes'],
      placeholder: 'Select vehicle make',
      order: 10,
      step: 2,
    },
    {
      label: 'Vehicle Model',
      type: 'text',
      required: true,
      placeholder: 'Enter vehicle model',
      order: 11,
      step: 2,
    },
    {
      label: 'Accident History (past 3 years)',
      type: 'select',
      required: true,
      selectOptions: ['0 accidents', '1 accident', '2+ accidents'],
      placeholder: 'Select accident history',
      order: 12,
      step: 2,
    },
    {
      label: 'Traffic Violations',
      type: 'checkbox',
      required: false,
      selectOptions: ['Speeding', 'Running Red Light', 'DUI'],
      order: 13,
      step: 2,
    },
    {
      label: 'Defensive Driving Course',
      type: 'checkbox',
      required: false,
      order: 14,
      step: 2,
    },

    // Step 3: Coverage & Location
    {
      label: 'Coverage Type',
      type: 'select',
      required: true,
      selectOptions: ['Basic', 'Comprehensive', 'Third-Party'],
      placeholder: 'Select coverage type',
      order: 15,
      step: 3,
    },
    {
      label: 'Location',
      type: 'map',
      required: true,
      placeholder: 'Select your governorate',
      order: 16,
      step: 3,
    },
    // {
    //   label: 'Street Address',
    //   type: 'text',
    //   required: true,
    //   placeholder: 'Enter your street address',
    //   order: 17,
    //   step: 3,
    // },
    // {
    //   label: 'City',
    //   type: 'text',
    //   required: true,
    //   placeholder: 'Enter your city',
    //   order: 18,
    //   step: 3,
    // },
  ];
  currentFormType = 'health';

  formTypes = [
    { id: 'auto', label: 'Auto', icon: 'fas fa-car' },
    { id: 'health', label: 'Health', icon: 'fas fa-heartbeat' },
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'life', label: 'Life', icon: 'fas fa-umbrella' },
  ];

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.formId = this.route.snapshot.paramMap.get('formId') || 'null';
    this.offerId = this.route.snapshot.paramMap.get('offerId') || 'null';
    this.insuranceForm = this.fb.group({});
    this.filteredFields();
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
        `${field.type}_${index}`,
        this.fb.control('', validators)
      );
    });
  }

  filteredFields() {
    this.filteredFormFields = this.formFields.filter(
      (field) => field.step === this.step
    );
    this.createFormControls();
  }

  nextStep() {
    if (this.step < 3) {
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

  changeFormType(formType: string): void {
    if (formType !== this.currentFormType) {
      // this.initializeForm(formType);
      this.notValid = false;
    }
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
    // if (this.insuranceForm.valid) {
    // const list = this.insuranceForm.value; // Assuming it's a JSON object

    // Object.entries(list).forEach(([key, value], index) => {
    //   this.data2Save.data!.push({
    //     fieldLabel: this.formFields[index].label,
    //     fieldType: this.formFields[index].type,
    //     fieldValue: value,
    //   });
    // });
    // this.data2Save.formId = this.formId;
    // console.log(this.saveForData);
    // this.saveForData();

    // return;
    // }
    // this.isLoading = false;  
    setTimeout(() => {
      this.isLoading = false;
      this.cleanForm();
    }, 1000);
    // this.notValid = true;
  }

  cleanForm() {
    this.insuranceForm.reset();
  }

  getCurrentValue(field: FormFieldDto, index: number): number {
    const controlName = this.getFormControlName(field, index);
    return this.insuranceForm.get(controlName)?.value || field.rangeStart;
  }

  updateRangeValue(field: FormFieldDto, index: number, event: Event): void {
    const controlName = this.getFormControlName(field, index);
    const value = (event.target as HTMLInputElement).value;
    this.insuranceForm.get(controlName)?.setValue(value);
  }

  toggleMap() {
    this.showMap = !this.showMap;
  }
}
