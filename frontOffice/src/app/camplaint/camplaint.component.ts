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
  complaintForm !: FormGroup;
  showPopup: boolean = false;
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
        console.log(selectedValue);
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


  getComplaints(): void {
    this.complaintService.getAllComplaints().subscribe((data) => {
      this.complaints = data;
      console.log(data);
    });
  }

  SaveApart() {

    if (this.complaintForm.invalid) {
      this.complaintForm.markAllAsTouched(); // Marquer tous les champs comme touchés pour afficher les erreurs
      return;
    }
    const complaint:Complaint=this.complaintForm.value;
    console.log(complaint);
    this.complaintService.addComplaint("67a9157f0a6a1371dce93411", complaint).subscribe(
      ()=>{
        this.complaintForm.reset();
        this.showPopup = true;
        console.log(this.showPopup);
      }

  )
  }

  closePopup() {
    this.showPopup = false;
  }
}
