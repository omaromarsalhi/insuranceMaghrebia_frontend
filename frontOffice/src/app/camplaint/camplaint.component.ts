import {Component, AfterViewInit, OnInit} from '@angular/core';
import {ComplaintService } from "../core/services/ComplaintService";
import {Complaint} from "../core/models/Complaint";
import {FormBuilder,Validators, FormGroup} from "@angular/forms";
import {TrackingService} from "../core/services/TrackingService";

declare var $: any;

@Component({
  selector: 'app-camplaint',
  templateUrl: './camplaint.component.html',
  styleUrls: ['./camplaint.component.css']
})
export class CamplaintComponent implements AfterViewInit,OnInit  {
  complaints: Complaint[] = [];
  // complaint!:Complaint;
  errorMessage !:string;
  complaintForm !: FormGroup;
  showPopup:boolean=false;
  popupTitle: string = '';
  popupMessage: string = '';
  loading: boolean = false;
  isloading: boolean = false;// État de chargement
  complaintTypes = [
    { value: 'SERVICE_QUALITY', label: 'Service Quality' },
    { value: 'DELIVERY', label: 'Delivery' },
    { value: 'CONTRACT_ISSUES', label: 'Contract Issues' },
    { value: 'REFUND_ISSUES', label: 'Refund Issues' },
  ];

  constructor(private complaintService: ComplaintService,
              public fb: FormBuilder,
              private trackingService: TrackingService)
  {
  }

  ngAfterViewInit() {
    if ($('select').length) {
      $('select').niceSelect();
      $('select').on('change', (event: any) => {
        const selectedValue = $(event.target).val();
        this.complaintForm.get('complaintType')?.setValue(selectedValue);
      });
    }
  }
  ngOnInit(): void {
    this.complaintForm=this.fb.group({
      title: ['', [Validators.required,Validators.maxLength(100),Validators.minLength(5)]],
      complaintDescription: ['', [Validators.required, Validators.maxLength(500),Validators.minLength(5)]],
      complaintType: ['SERVICE_QUALITY', Validators.required],

    })

  }
  generateTitle() {
    const descriptionControl = this.complaintForm.get('complaintDescription');
    descriptionControl?.markAsTouched();
    descriptionControl?.markAsDirty();
    // this.loading = true;
    if (!descriptionControl || !descriptionControl.value) {
      // this.errorMessage = 'Please enter a description.';
      // this.popupMessage='testt'
      // this.popupTitle = "Error";
      // this.popupMessage = "Please enter a description.";
      // this.showPopup = true;
      return;
    }
    this.loading = true;
    const desc: string = descriptionControl.value;
    this.complaintService.getSuggestedTitle(desc).subscribe({
      next: (response) => {
        setTimeout(() => {
          console.log(response);
          this.complaintForm.get('title')?.setValue(response);
          this.loading = false;
        }, 700);
      },
      error: (err) => {
        console.error('Error fetching title:', err);
        this.errorMessage = 'Failed to generate a title. Try again.';
      }
    });
  }

  SaveApart() {
    this.trackingService.trackEvent("click_button", "save Complaint");

    if (this.complaintForm.invalid) {
      this.complaintForm.markAllAsTouched();
      return;
    }

    this.isloading = true;

    setTimeout(() => {
      const complaint: Complaint = this.complaintForm.value;

      this.complaintService.addComplaint("67a9157f0a6a1371dce93411", complaint).subscribe({
        next: () => {
          this.complaintForm.reset();
          this.showPopup = true;
          this.popupTitle = "✅ Complaint Received";
          this.popupMessage = "Thank you! We have received your complaint and will get back to you soon.";
        },
        error: (err) => {
          console.error("Error submitting complaint:", err);

          if (err.error && err.error.error) {
            this.errorMessage = err.error.error;
            this.popupTitle = "Invalid Complaint Submission";
            this.popupMessage = this.errorMessage;
            this.isloading = false;
            this.showPopup = true;
          } else {
            this.errorMessage = "An unexpected error occurred. Please try again later.";
          }
        },
        complete: () => {
          this.isloading = false;
        }
      });
    }, 5000);
  }
  onPopupClose() {
    this.showPopup = false;
  }
}
