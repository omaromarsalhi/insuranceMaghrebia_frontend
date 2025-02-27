import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ComplaintService} from 'src/app/core/services/complaintService';
import {Complaint} from 'src/app/core/models/complaint';
import {ComplaintResponseService} from 'src/app/core/services/ComplaintResponseService';
import {ResponseComplaint} from 'src/app/core/models/responseComplaint';


@Component({
    selector: 'app-listComplaint',
    templateUrl: './usergrid.component.html',
    styleUrls: ['./usergrid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UsergridComponent implements OnInit {
    breadCrumbItems: Array<{}>;
    complaints: Complaint[] = [];
    selectedComplaint: Complaint = null;
    responseofSelectCmplaint: ResponseComplaint = null;
    responseForm: FormGroup;
    submitted = false;
    items: FormArray;
    reponses: ResponseComplaint[] = [];
    test: ResponseComplaint[] = [];
    isSubmitting = false;

    constructor(
        private modalService: NgbModal,
        private complaintService: ComplaintService,
        private complaintResponseService: ComplaintResponseService) {
    }

    async ngOnInit() {
        this.breadCrumbItems = [{label: 'Contacts'}, {label: 'Users Grid', active: true}];
        this.responseForm = new FormGroup({
            responseDescription: new FormControl('', [Validators.required, Validators.maxLength(500), Validators.minLength(5)])
        });
        await this.loadResponses();
        await this.getComplaints();

    }

    get form() {
        return this.responseForm.controls;
    }

    /**
     * Open modal
     * @param content modal content
     */

    openModal(content: any, complaint: any) {
        this.selectedComplaint = complaint;
        // this.hasUnseenResponse(this.selectedComplaint.complaintId);
        if (this.responseofSelectCmplaint) {
            this.responseForm.get('responseDescription').setValue(this.responseofSelectCmplaint.responseDescription);
        }
        this.modalService.open(content);
    }

    // async saveResponse() {
    //     if (this.responseForm.invalid) {
    //         this.responseForm.markAllAsTouched();
    //         return;
    //     }
    //     this.isSubmitting=true;
    //     const response: ResponseComplaint = this.responseForm.value;
    //     try {
    //         const res = await this.complaintResponseService
    //             .addResponse(response, '1234', this.selectedComplaint.complaintId)
    //             .toPromise();
    //         console.log('Response submitted:', res);
    //         await this.loadResponses();
    //         this.modalService.dismissAll();
    //         this.selectedComplaint.complaintStatus = 'OPEN';
    //         for (const r of this.reponses) {
    //             if (!r.isSeen && r.responderId === this.selectedComplaint.userId) {
    //                 this.markResponseAsSeen(r.responseId);
    //                 const responseToUpdate = this.reponses.find(resp => resp.responseId === r.responseId);
    //                 if (responseToUpdate) {
    //                     responseToUpdate.isSeen = true;
    //                 }
    //             }
    //         }
    //         this.isSubmitting=true;
    //     } catch (err) {
    //         this.isSubmitting = false;
    //         console.error('Error submitting response', err);
    //         console.log(this.responseForm.get('responseDescription').value);
    //     }
    //
    //
    //
    // }
    async saveResponse() {
        if (this.responseForm.invalid) {
            this.responseForm.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;
        setTimeout(async () => {
            const response: ResponseComplaint = this.responseForm.value;

            try {
                const res = await this.complaintResponseService
                    .addResponse(response, '1234', this.selectedComplaint.complaintId)
                    .toPromise();
                console.log('Response submitted:', res);
                await this.loadResponses();
                // this.modalService.dismissAll();
                this.selectedComplaint.complaintStatus = 'OPEN';
                for (const r of this.reponses) {
                    if (!r.isSeen && r.responderId === this.selectedComplaint.userId) {
                        this.markResponseAsSeen(r.responseId);
                        const responseToUpdate = this.reponses.find(resp => resp.responseId === r.responseId);
                        if (responseToUpdate) {
                            responseToUpdate.isSeen = true;
                        }
                    }
                }


            } catch (err) {
                console.error('Error submitting response', err);
            } finally {
                this.isSubmitting = false;
            }
        }, 500);
    }


    getResponseComplaints(): void {
        this.complaintResponseService.getResponseByComplaintId(this.selectedComplaint.complaintId).subscribe((data) => {
            this.responseofSelectCmplaint = data;
            this.reponses = data;
        });
    }


    markResponseAsSeen(responseId: string) {
        this.complaintResponseService.markAsSeen(responseId).subscribe({
            next: (response) => {
                console.log('Réponse mise à jour avec succès', response);
            },
            error: (error) => {
                console.error('Erreur lors de la mise à jour', error);
            }
        });
    }


    hasUnseenResponse(complaintId: string): boolean {
        if (!this.reponses || this.reponses.length === 0) {
            console.log('heloo');
        }
        const complaint = this.complaints.find(c => c.complaintId === complaintId);
        if (!complaint) {
            return false;
        }
        return this.reponses.filter(response =>
            response.complaintId === complaintId &&
            !response.isSeen &&
            response.responderId === complaint.userId
        ).length > 0;

    }

    async getComplaints(): Promise<void> {
        try {
            this.complaints = await this.complaintService.getAllComplaints().toPromise();
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    }

    async loadResponses(): Promise<void> {
        try {
            this.reponses = await this.complaintResponseService.getAllResponses().toPromise();
        } catch (error) {
            console.error('Error loading responses:', error);
        }
    }

}
