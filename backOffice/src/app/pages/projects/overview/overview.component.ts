import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Complaint} from '../../../core/models/complaint';
import {ComplaintResponseService} from '../../../core/services/ComplaintResponseService';
import {ResponseComplaint} from '../../../core/models/responseComplaint';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ComplaintService} from '../../../core/services/complaintService';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})

/**
 * Overview component
 */
export class OverviewComponent implements OnInit {
    reponses: ResponseComplaint[] = [];
    breadCrumbItems: Array<{}>;
    responseForm: FormGroup;
    data!: Complaint;
    submitted = false;

    constructor(private router: Router,
                private complaintResponseService: ComplaintResponseService,
                private complaintService: ComplaintService) {

        this.data = this.router.getCurrentNavigation()?.extras.state?.['data'];
        console.log(this.data);
    }

    async ngOnInit() {
        await this.loadResponses(this.data.complaintId);
        console.log(this.reponses);
        this.responseForm = new FormGroup({
            responseDescription: new FormControl('', [Validators.required, Validators.maxLength(500), Validators.minLength(5)])
        });
        if (this.data.complaintType === 'NEW') {
            this.changeStatus(this.data.complaintId, 'OPEN');
        }
    }

    async loadResponses(complaintid: string): Promise<void> {
        try {
            this.reponses = await this.complaintResponseService.getResponseByComplaintId(complaintid).toPromise();
        } catch (error) {
            console.error('Error loading responses:', error);
        }
    }

    async saveResponse() {
        if (this.responseForm.invalid) {
            this.responseForm.markAllAsTouched();
            return;
        }
        this.submitted = true;
        setTimeout(async () => {
            const response: ResponseComplaint = this.responseForm.value;

            try {
                const res = await this.complaintResponseService
                    .addResponse(response, '1234', this.data.complaintId)
                    .toPromise();
                console.log('Response submitted:', res);
                await this.loadResponses(this.data.complaintId);
                this.data.complaintStatus = 'IN_PROGRESS';
                this.changeStatus(this.data.complaintId, 'IN_PROGRESS');
                for (const r of this.reponses) {
                    if (!r.isSeen && r.responderId === this.data.userId) {
                        this.markResponseAsSeen(r.responseId);
                        const responseToUpdate = this.reponses.find(resp => resp.responseId === r.responseId);
                        if (responseToUpdate) {
                            responseToUpdate.isSeen = true;
                        }
                    }
                }
                this.responseForm.reset();

            } catch (err) {
                console.error('Error submitting response', err);
            } finally {
                this.submitted = false;
            }
        }, 500);
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

    toggleStatus() {
        const newStatus = this.data.complaintStatus === 'RESOLVED' ? 'IN_PROGRESS' : 'RESOLVED';
        const confirmationMessage = `Voulez-vous vraiment passer le statut à "${newStatus}" ?`;

        if (confirm(confirmationMessage)) {
            this.complaintService.updateStatus(this.data.complaintId, newStatus)
                .subscribe({
                    next: (updatedComplaint) => {
                        this.data.complaintStatus = newStatus;
                        // this.toastr.success('Statut mis à jour avec succès');
                    },
                    error: (error) => {
                        // this.toastr.error('Échec de la mise à jour du statut');
                        console.error('Error updating status:', error);
                    }
                });
        }
    }

    changeStatus(idComplaint: string, newStatus: string) {
        this.complaintService.updateStatus(idComplaint, newStatus).subscribe({
            next: (response) => {
                console.log('Réponse du serveur:', response);
                alert('Statut mis à jour avec succès!');
            },
            error: (error) => {
                console.error('Erreur lors de la mise à jour:', error);
                alert('Erreur lors de la mise à jour du statut');
            }
        });
    }
}
