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
  complaintForm !: FormGroup
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
      // fullName: ['', [Validators.required]],
      complaintDescription: ['', [Validators.required, Validators.email]],
      complaintType: ['', Validators.required],

    })

  }


  getComplaints(): void {
    this.complaintService.getAllComplaints().subscribe((data) => {
      this.complaints = data;
      console.log(data);
    });
  }

  SaveApart() {
    const complaint:Complaint=this.complaintForm.value;
    console.log(complaint);
    this.complaintService.addComplaint("1234", complaint).subscribe(
      ()=>{console.log("eee");
      this.complaintForm.reset();
      }

  )
  }
}
