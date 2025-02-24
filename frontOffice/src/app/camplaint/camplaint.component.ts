import {Component, AfterViewInit, OnInit} from '@angular/core';
import {ComplaintService } from "../core/services/ComplaintService";
import {Complaint} from "../core/models/Complaint";
import {FormBuilder,Validators, FormGroup} from "@angular/forms";

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
  popupMessage !:string;
  popupTitle !:string;
  complaintForm !: FormGroup;
  showPopup: boolean = false;
  loading: boolean = false; // État de chargement
  complaintTypes = [
    { value: 'SERVICE_QUALITY', label: 'Service Quality' },
    { value: 'DELIVERY', label: 'Delivery' },
    { value: 'CONTRACT_ISSUES', label: 'Contract Issues' },
    { value: 'REFUND_ISSUES', label: 'Refund Issues' },
  ];

  constructor(private complaintService: ComplaintService,
              public fb: FormBuilder)
  {}
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
    if (!descriptionControl || !descriptionControl.value) {
      this.errorMessage = 'Please enter a description.';
      return;
    }
    this.loading = true;
    const desc: string = descriptionControl.value;
    this.complaintService.getSuggestedTitle(desc).subscribe({
      next: (response) => {
        console.log(response);
        this.complaintForm.get('title')?.setValue(response);
        this.loading=false;

      },
      error: (err) => {
        console.error('Error fetching title:', err);
        this.errorMessage = 'Failed to generate a title. Try again.';
      }
    });
  }



    // Début du chargement
  //   // Simuler un délai de génération
  //   setTimeout(() => {
  //     const titles = [
  //       "Urgent Assistance Needed",
  //       "Service Issue Report",
  //       "Request for Investigation",
  //       "Complaint Regarding Policy",
  //       "Insurance Claim Problem"
  //     ];
  //     const randomIndex = Math.floor(Math.random() * titles.length);
  //     this.complaintForm.get('title')?.setValue(titles[randomIndex]);
  //
  //     this.loading = false; // Fin du chargement
  //   }, 2000); // Simulation de 2 secondes de chargement
  // }





  getComplaints(): void {
    this.complaintService.getAllComplaints().subscribe((data) => {
      this.complaints = data;
      console.log(data);
    });
  }

  // SaveApart() {
  //
  //   if (this.complaintForm.invalid) {
  //     this.complaintForm.markAllAsTouched(); // Marquer tous les champs comme touchés pour afficher les erreurs
  //     return;
  //   }
  //   const complaint:Complaint=this.complaintForm.value;
  //   console.log(complaint);
  //   this.complaintService.addComplaint("67a9157f0a6a1371dce93411", complaint).subscribe(
  //     ()=>{
  //       this.complaintForm.reset();
  //       this.showPopup = true;
  //       console.log(this.showPopup);
  //     }
  //
  // )
  // }
  SaveApart() {
    if (this.complaintForm.invalid) {
      this.complaintForm.markAllAsTouched();
      return;
    }

    const complaint: Complaint = this.complaintForm.value;
    this.complaintService.addComplaint("67a9157f0a6a1371dce93411", complaint).subscribe({
      next: () => {
        this.complaintForm.reset();
        this.showPopup = true;
      },
      error: (err) => {
        console.error("Error submitting complaint:", err);

        if (err.error && err.error.error) {
          this.errorMessage = err.error.error;
          this.popupTitle="errorrrr";
          this.popupMessage=this.errorMessage;
          this.showPopup=true;
        } else {
          this.errorMessage = "An unexpected error occurred. Please try again later.";
        }
      }
    });
  }
  closePopup() {
    this.showPopup = false;
  }
}
