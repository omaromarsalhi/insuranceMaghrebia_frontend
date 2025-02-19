import {Component, OnInit} from '@angular/core';
import {ComplaintService} from "../core/services/ComplaintService";
import {FormBuilder} from "@angular/forms";
import {Complaint} from "../core/models/Complaint";
declare var $: any;
@Component({
  selector: 'app-show-complaint',
  templateUrl: './show-complaint.component.html',
  styleUrls: ['./show-complaint.component.css']
})
export class ShowComplaintComponent implements OnInit   {
  complaints: Complaint[] = [];
  selectedFilter = '*';
  filteredComplaints:Complaint[] = [];
  categories = [
    { name: 'Show All', filter: '*' },
    { name: 'Service Quality', filter: 'SERVICE_QUALITY' },
    { name: 'Delivery', filter: 'DELIVERY' },
    { name: 'Contract Issues', filter: 'CONTRACT_ISSUES' },
    { name: 'Refund Issues', filter: 'REFUND_ISSUES' },

  ];
  constructor(private complaintService: ComplaintService)
  {}

  ngOnInit(): void {
    this.getComplaints();
    this.filteredComplaints = this.complaints;
  }
  getComplaints(): void {
    this.complaintService.getAllComplaints().subscribe((data) => {
      this.complaints = data;
      console.log(data);
    });
  }


  filterComplaints(filter: string) {
    this.selectedFilter = filter;
    if (filter === '*') {
      this.filteredComplaints = this.complaints;
    } else {
      this.filteredComplaints = this.complaints.filter(complaint => complaint.complaintType === filter);
    }
  }
}
