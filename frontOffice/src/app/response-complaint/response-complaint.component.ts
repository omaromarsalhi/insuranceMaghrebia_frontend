import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from "../core/services/ComplaintService";
import { ComplaintResponseService } from "../core/services/ComplaintResponse";
import { Complaint } from "../core/models/Complaint";
import { ResponseComplaint } from "../core/models/ComplaintReponse";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-response-complaint',
  templateUrl: './response-complaint.component.html',
  styleUrls: ['./response-complaint.component.css']
})
export class ResponseComplaintComponent implements OnInit {
  responses: ResponseComplaint[] = []; // Initialisation par défaut
  complaint: Complaint = {} as Complaint; // Initialisation par défaut
  complaintId!: string;
  responseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private responseComplaint: ComplaintResponseService,
    private complaintService: ComplaintService,
    private actR: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.actR.params.subscribe(async (params) => {
      this.complaintId = params['id'];
      this.responseForm = this.fb.group({
        responseDescription: ['', [Validators.required, Validators.maxLength(500), Validators.minLength(5)]]
      });

      if (this.complaintId) {
        await this.getComplaintbyId(this.complaintId);
        await this.getResponsesByComplaint(this.complaintId);
      } else {
        console.error('Complaint ID is undefined');
      }
    });
  }

  async getComplaintbyId(id: string): Promise<void> {
    try {
      const c = await this.complaintService.getComplaintById(id).toPromise();
      if (c) {
        this.complaint = c;
        console.log('Complaint loaded:', this.complaint);
      }
    } catch (error) {
      console.error('Error fetching complaint:', error);
    }
  }

  async getResponsesByComplaint(id: string): Promise<void> {
    try {
      const res = await this.responseComplaint.getResponsesByComplaintId(id).toPromise();
      if (res) {
        this.responses = res;
        console.log('Responses loaded:', this.responses);
      }
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  }

  async saveResponse(): Promise<void> {
    if (this.responseForm.invalid) {
      this.responseForm.markAllAsTouched();
      return;
    }
    const response: ResponseComplaint = this.responseForm.value;
    console.log('Response Description:', response.responseDescription);
    const userId = this.complaint?.userId ?? 'defaultUserId';
    const complaintId = this.complaint?.complaintId ?? 'defaultComplaintId';

    try {
      const res = await this.responseComplaint
        .addResponse(response, userId, complaintId)
        .toPromise();

      console.log('Response submitted:', res);
      this.responses?.push(res);
      this.responseForm.reset();
      await this.getResponsesByComplaint(this.complaintId);
      for (const r of this.responses) {
        if (!r.isSeen && r.responderId !== this.complaint.userId) {
          this.markResponseAsSeen(r.responseId);
        }
      }
    } catch (err) {
      console.error('Error submitting response', err);
    }
  }

  markResponseAsSeen(responseId: string | undefined) {
    if (responseId) {
      this.responseComplaint.markAsSeen(responseId).subscribe({
        next: (response) => {
          console.log('Réponse mise à jour avec succès', response);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour', error);
        }
      });
    } else {
      console.error('Response ID is undefined');
    }
  }
}
