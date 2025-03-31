import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  insuranceForm!: FormGroup;
  step: number = 1; // Track current step

  trafficViolations = ['Speeding', 'DUI', 'Reckless Driving', 'Running Red Lights', 
    'Illegal Parking', 'Lane Violation', 'Other'];


  accidentHistoryOptions = ['0', '1', '2+'];
  vehicleTypes = ['Car', 'Motorcycle', 'Truck'];
  vehicleMakes = ['Renault', 'Peugeot', 'Wallyscar'];
  governorates = ['Tunis', 'Sfax', 'Sousse', 'Ariana'];
  coverageTypes = ['Liability', 'Comprehensive', 'Collision'];
  safetyFeatures = ['ABS', 'Airbags', 'Parking Sensors'];
  antiTheftDevices = ['Alarm', 'GPS Tracker'];
  vehiclePurposes = ['Personal', 'Commercial', 'Taxi'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.insuranceForm = this.fb.group({
      // Step 1: Personal Info
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('\\+216\\s\\d{2}\\s\\d{3}\\s\\d{3}')]],
      dateOfBirth: ['', Validators.required],
      cin: ['', [Validators.required, Validators.pattern('^\\d{8}$')]],

      // Step 2: Driver & Vehicle Details
      licenseNumber: ['', [Validators.required, Validators.pattern('^[A-Z]{2}\\d{5}$')]],
      drivingExperience: ['', [Validators.required, Validators.min(1)]],
      accidentHistory: ['', Validators.required],
      trafficViolations: [[]],
      defensiveDrivingCourse: [false],
      vehicleType: ['', Validators.required],
      vehicleMake: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      vehicleYear: ['', [Validators.required, Validators.min(1990), Validators.max(2024)]],
      vin: ['', [Validators.pattern('^[A-HJ-NPR-Z0-9]{17}$')]],
      licensePlate: ['', [Validators.required, Validators.pattern('^TU-[A-Z0-9]{4}-[A-Z]{2}$')]],
      mileage: ['', Validators.required],
      vehiclePurpose: ['', Validators.required],
      safetyFeatures: [[]],
      antiTheftDevices: [[]],

      // Step 3: Coverage & Location
      coverageType: ['', Validators.required],
      addOns: [[]],
      deductibleAmount: [500, Validators.required],
      governorate: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      garageType: [''],
    });
  }

  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  onSubmit(): void {
    if (this.insuranceForm.valid) {
      console.log('Form Data:', this.insuranceForm.value);
    } else {
      console.log('Form is invalid!');
    }
  }
}
