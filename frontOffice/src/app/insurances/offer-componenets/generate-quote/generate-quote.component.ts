import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-generate-quote',
  templateUrl: './generate-quote.component.html',
  styleUrls: ['./generate-quote.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(300)),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(20px)', opacity: 0 }))
      ])
    ])
  ]
})
export class GenerateQuoteComponent implements OnInit {
  insuranceForm: FormGroup;
  showPopup = false;
  isLoading = false;
  notValid = false;
  currentFormType = 'health'; // Default form type
  formFields: any[] = [];

  // Define different form configurations
  formConfigurations: any = {
    health: [
      { type: 'text', label: 'Full Name', required: true },
      { type: 'date', label: 'Date of Birth', required: true },
      { type: 'select', label: 'Coverage Type', selectOptions: ['Basic', 'Standard', 'Premium'], required: true },
      { type: 'number', label: 'Annual Income', required: true },
      { type: 'checkbox', label: 'Include Dental Coverage', required: false }
    ],
    auto: [
      { type: 'text', label: 'Vehicle Make', required: true },
      { type: 'text', label: 'Vehicle Model', required: true },
      { type: 'number', label: 'Year', required: true },
      { type: 'select', label: 'Coverage Level', selectOptions: ['Liability', 'Full Coverage'], required: true },
      { type: 'number', label: 'Estimated Annual Miles', required: true }
    ],
    home: [
      { type: 'text', label: 'Property Address', required: true },
      { type: 'number', label: 'Square Footage', required: true },
      { type: 'number', label: 'Year Built', required: true },
      { type: 'select', label: 'Coverage Type', selectOptions: ['Basic', 'Extended', 'Premium'], required: true },
      { type: 'checkbox', label: 'Include Flood Insurance', required: false }
    ],
    life: [
      { type: 'text', label: 'Full Name', required: true },
      { type: 'date', label: 'Date of Birth', required: true },
      { type: 'number', label: 'Desired Coverage Amount', required: true },
      { type: 'select', label: 'Term Length', selectOptions: ['10 Years', '20 Years', '30 Years'], required: true },
      { type: 'checkbox', label: 'Include Critical Illness', required: false }
    ]
  };

  formTypes = [
    { id: 'auto', label: 'Auto', icon: 'fas fa-car' },
    { id: 'health', label: 'Health', icon: 'fas fa-heartbeat' },
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'life', label: 'Life', icon: 'fas fa-umbrella' }
];

  constructor(private fb: FormBuilder) {
    this.insuranceForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeForm('auto');
  }

  // Initialize form based on type
  initializeForm(formType: string): void {
    this.currentFormType = formType;
    this.formFields = this.formConfigurations[formType];
    this.createFormControls();
  }

  // Create form controls dynamically
  createFormControls(): void {
    const formGroup: any = {};
    
    this.formFields.forEach((field, index) => {
      const validators = [];
      if (field.required) {
        validators.push(Validators.required);
      }
      
      formGroup[this.getFormControlName(field, index)] = ['', validators];
    });
    
    this.insuranceForm = this.fb.group(formGroup);
  }

  // Change form type when button is clicked
  changeFormType(formType: string): void {
    if (formType !== this.currentFormType) {
      this.initializeForm(formType);
      this.notValid = false;
    }
  }

  // Generate unique control names
  getFormControlName(field: any, index: number): string {
    return `${field.type}_${index}`;
  }

  // Track by function for ngFor
  trackByFn(index: number, item: any): number {
    return index;
  }

  // Handle form submission
  onSubmit(): void {
    this.notValid = true;
    
    if (this.insuranceForm.valid) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.showPopup = true;
        this.notValid = false;
      }, 1500);
    }
  }

  // For range inputs - get current value
  getCurrentValue(field: any, index: number): string {
    const control = this.insuranceForm.get(this.getFormControlName(field, index));
    return control ? control.value : field.rangeStart;
  }

  // For range inputs - update value display
  updateRangeValue(field: any, index: number, event: any): void {
    const control = this.insuranceForm.get(this.getFormControlName(field, index));
    if (control) {
      control.setValue(event.target.value);
    }
  }
}