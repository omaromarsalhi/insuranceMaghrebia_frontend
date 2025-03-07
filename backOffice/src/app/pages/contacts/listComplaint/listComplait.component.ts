import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ComplaintService} from 'src/app/core/services/complaintService';
import {Complaint} from 'src/app/core/models/complaint';
import {ComplaintResponseService} from 'src/app/core/services/ComplaintResponseService';
import {ResponseComplaint} from 'src/app/core/models/responseComplaint';
import {Router} from '@angular/router';


@Component({
    selector: 'app-listComplaint',
    templateUrl: './listComplait.component.html',
    styleUrls: ['./listComplait.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ListComplaitComponent implements OnInit {
    @ViewChild('scrollEle') scrollEle;
    @ViewChild('scrollRef') scrollRef;
    breadCrumbItems: Array<{}>;
    complaints: Complaint[] = [];
    responseForm: FormGroup;
    items: FormArray;
    reponses: ResponseComplaint[] = [];
    test: ResponseComplaint[] = [];
    searchText: any;
    filteredComplaints: any[] = [];
    selectedStatuses: string[] = [];
    selectedTypes: string[] = [];
    possibleStatuses = ['OPEN', 'RESOLVED', 'IN_PROGRESS'];
    possibleTypes = ['TYPE1', 'TYPE2', 'TYPE3']; // Remplacez par vos types

// Méthode de filtrage
    applyFilters() {
        this.filteredComplaints = this.complaints.filter(complaint => {
            const statusMatch = this.selectedStatuses.length === 0
                || this.selectedStatuses.includes(complaint.complaintStatus);

            const typeMatch = this.selectedTypes.length === 0
                || this.selectedTypes.includes(complaint.complaintType);

            return statusMatch && typeMatch;
        });
    }

    constructor(
        private complaintService: ComplaintService,
        private complaintResponseService: ComplaintResponseService,
        private router: Router) {
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

    showComponent(complaint: Complaint) {
        this.router.navigate(['/show/responses'], {state: {data: complaint}});
    }

    filterComplaints() {
        // this.filteredComplaints = this.complaints.filter(complaint => {
        //     const matchesSearch = complaint.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        //         complaint.description.toLowerCase().includes(this.searchText.toLowerCase());
        //
        //     const matchesStatus = this.selectedStatus ?
        //         complaint.status === this.selectedStatus : true;
        //
        //     const matchesType = this.selectedType ?
        //         complaint.type === this.selectedType : true;
        //
        //     return matchesSearch && matchesStatus && matchesType;
        // });
    }


}
