import { Component } from '@angular/core';

interface FormData {
  name: string;
  email: string;
  phone: string;
  insuranceType: string;
}

@Component({
  selector: 'app-purshased-offer',
  templateUrl: './purshased-offer.component.html',
  styleUrls: ['./purshased-offer.component.css']
})
export class PurshasedOfferComponent {
  activeTab: string = 'cat1';

  // Separate form data for each tab
  formData: { [key: string]: FormData } = {
    cat1: { name: '', email: '', phone: '', insuranceType: 'House Insurance' },
    cat2: { name: '', email: '', phone: '', insuranceType: 'Car Insurance' },
    cat3: { name: '', email: '', phone: '', insuranceType: 'Study Insurance' },
    cat4: { name: '', email: '', phone: '', insuranceType: 'Travel Insurance' }
  };

  // Define form fields
  formFields = [
    { label: 'Full Name', type: 'text', name: 'name', placeholder: 'Jeremy C. Jefferson' },
    { label: 'Email Address', type: 'email', name: 'email', placeholder: 'support@gmail.com' },
    { label: 'Phone No', type: 'text', name: 'phone', placeholder: '+000 (123) 456 887' }
  ];

  insuranceTypes = ['House Insurance', 'Car Insurance', 'Study Insurance', 'Travel Insurance'];

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  submitForm(): void {
    const currentData = this.formData[this.activeTab];
    console.log(`Form for ${this.activeTab} submitted:`, currentData);
  }
}