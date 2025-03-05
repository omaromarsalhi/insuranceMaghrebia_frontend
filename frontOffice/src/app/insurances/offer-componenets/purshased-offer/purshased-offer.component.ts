import { Component, AfterViewInit, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormFieldDto } from 'src/app/core/models';
import { OfferFormControllerService } from 'src/app/core/services/offer-form-controller.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-purshased-offer',
  templateUrl: './purshased-offer.component.html',
  styleUrls: ['./purshased-offer.component.css', './nice-select.css'],
})
export class PurshasedOfferComponent implements OnInit {
  formId!: string;
  insuranceForm!: FormGroup;
  formFields: Array<FormFieldDto> = [];
  isLoading: boolean = false;
  notValid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private formData: OfferFormControllerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.formId = this.route.snapshot.paramMap.get('formId') || 'null';
    console.log('Form ID:', this.formId);
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
        validators.push(Validators.pattern(field.regex));
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
    
    if (this.insuranceForm.valid) {
      this.isLoading = true;
      console.log('omar');
      return
    }
    this.notValid=true
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
