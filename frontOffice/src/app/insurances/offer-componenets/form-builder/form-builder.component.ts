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

import { AddressInfo } from 'src/app/core/models/offer/address-info';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { MyFormFieldDto } from 'src/app/core/models/offer/my-form-field';

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
  @Input() isAiExplainerOn: boolean = false;
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
    // auto
    'drivingExperience',
    'accidentHistory',
    'trafficViolations',
    'defensiveDrivingCourse',
    'coverageType',
    'vehicleType',

    // health
    'age',
    'governorate',
    'occupation',
    'preExistingConditions',
    'familyHistory',
    'hospitalizations',
    'surgeries',
    'chronicIllnesses',
    'smoking',
    'alcohol',
    'exercise',
    'bmi',
    'planType',
    'deductible',
    'addOns',
    'travelFrequency',
    'vaccinations',
  ];
  allowedField2ExplaiWithCondition = ['vin', 'gender'];

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

  onUserInput(event: Event, fieldName: string, opt?: any) {
    let value = '';
    if (opt) value = opt;
    value = this.insuranceForm.get(fieldName)?.value;
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


  showValidationError(controlName: string): boolean | undefined {
    const control = this.insuranceForm.get(controlName);
    return (
      (control?.invalid && control.touched) ||
      (control?.invalid && this.isFormSubmitted)
    );
  }
}

