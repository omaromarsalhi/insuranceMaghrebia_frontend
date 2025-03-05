import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';




@Component({
  selector: 'app-purshased-offer',
  templateUrl: './purshased-offer.component.html',
  styleUrls: ['./purshased-offer.component.css']
})
export class PurshasedOfferComponent  {
  insuranceForm: FormGroup;
  formFields = [
    // Example form fields
    { label: 'name', type: 'text', placeholder: 'Enter your name' },
    { label: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'phone', type: 'tel', placeholder: 'Enter your phone number' },
    { label: 'gender', type: 'select', selectOptions: ['Male', 'Female', 'Other'] },
    { label: 'age', type: 'range', rangeStart: 18, rangeEnd: 100 },
    { label: 'interests', type: 'checkbox', selectOptions: ['Sports', 'Music', 'Travel'] }
  ];

  constructor(private fb: FormBuilder) {
    this.insuranceForm = this.fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      gender: new FormControl(''),
      age: new FormControl(18),
      interests: new FormControl([])
    });
  }



  
  trackByFn(index: number, item: any): any {
    return index;
  }

  get formControls() {
    return this.insuranceForm.controls;
  }
}