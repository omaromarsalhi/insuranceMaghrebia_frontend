import {Component, OnInit} from '@angular/core';
import {ComplaintService} from "../../core/services/complaint/ComplaintService";
import {FormBuilder} from "@angular/forms";
import {Complaint} from "../../core/models/complaint/Complaint";
import {ResponseComplaint} from "../../core/models/complaint/ComplaintReponse";
import {ComplaintResponseService} from "../../core/services/complaint/ComplaintResponse";

declare var $: any;

@Component({
  selector: 'app-show-complaint',
  templateUrl: './show-complaint.component.html',
  styleUrls: ['./show-complaint.component.css']
})
export class ShowComplaintComponent implements OnInit {
  complaints: Complaint[] = [];
  selectedFilter = '*';
  filteredComplaints: Complaint[] = [];
  reponses: ResponseComplaint[]=[];
  categories = [
    {name: 'Show All', filter: '*'},
    {name: 'Service Quality', filter: 'SERVICE_QUALITY'},
    {name: 'Delivery', filter: 'DELIVERY'},
    {name: 'Contract Issues', filter: 'CONTRACT_ISSUES'},
    {name: 'Refund Issues', filter: 'REFUND_ISSUES'},

  ];

  constructor(private complaintService: ComplaintService,
              private complaintResponseService: ComplaintResponseService) {
  }

  async ngOnInit() {
    this.getComplaints();
    await  this.loadResponses();
  }


  getComplaints(): void {
    this.complaintService.getComplaintsByUserId("67a9157f0a6a1371dce93411").subscribe((data) => {
      this.filteredComplaints = data;
      this.complaints = data;
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

  hasUnseenResponse(complaintId: string): boolean {
    if (!this.reponses || this.reponses.length === 0) {
    }
    const complaint = this.complaints.find(c => c.complaintId === complaintId);
    if (!complaint) {
      return false;
    }
    return this.reponses.filter(response =>
      response.complaintId === complaintId &&
      !response.isSeen &&
      response.responderId !== complaint.userId
    ).length > 0;

  }

  async loadResponses(): Promise<void> {
    try {
      this.reponses = await this.complaintResponseService.getAllResponses().toPromise();
    } catch (error) {
      console.error('Error loading responses:', error);
    }
  }


}
