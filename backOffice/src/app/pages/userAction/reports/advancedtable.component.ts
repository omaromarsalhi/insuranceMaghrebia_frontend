import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Table } from './advanced.model';
import { editableTable, tableData } from './data';
//import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirective } from './advanced-sortable.directive';
import { ReportService } from '../../../core/services/userAction/ReportService';
import { ReportResponse } from '../../../core/models/userAction/ReportResponse';
import { User } from 'src/app/core/models/auth.models';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
    selector: 'app-reports',
    templateUrl: './advancedtable.component.html',
    styleUrls: ['./advancedtable.component.scss'],
    providers: [ DecimalPipe] //AdvancedService
})
export class AdvancedtableComponent implements OnInit {

    breadCrumbItems: Array<{}>;
    tableData: Table[];
    hideme: boolean[] = [];
    tables$: Observable<Table[]>;
    total$: Observable<number>;
    editableTable: any;
    selectedReport: any = null;
    newReport: any = {
        date: new Date().toISOString().split('T')[0],
        status: 'Nouveau',
        details: ''
    };
    isLoading = false;
    users: User[] = [];
    reportVisibility: { [userId: string]: boolean } = {};
    formVisibility: { [userId: string]: boolean } = {};
    reports: ReportResponse[] = [];
    @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;

    constructor(//public service: AdvancedService,
        private reportService: ReportService,
        private userService: UserService,
        private authService: AuthService) {
        // this.tables$ = service.tables$;
        // this.total$ = service.total$;
    }



    async ngOnInit() {
        this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Advanced Table', active: true }];
        this._fetchData();
        this.userService.getAll(this.authService.getCurrentUserId()).subscribe((data) => {
            this.users=data;
            this.users.forEach(user => {
                this.reportVisibility[user.id] = false;
                this.formVisibility[user.id] = false;
            });
        }
        );


    }


    toggleReport(index: string): void {
        console.log(index);
        this.reportVisibility[index] = !this.reportVisibility[index];
        this.getReports(index);
    }

    showAnalysisForm(userIndex: string): void {
        this.formVisibility[userIndex] = !this.formVisibility[userIndex];
    }

    _fetchData() {
        this.tableData = tableData;
        this.editableTable = editableTable;
        for (let i = 0; i <= this.tableData.length; i++) {
            this.hideme.push(true);
        }
    }


    async getReports(userid: string): Promise<void> {
        try {
            this.reports = [];
            const r = await this.reportService.getReportsByUserId(userid).toPromise();
            if (r) {
                this.reports = r;
            }
        } catch (error) {
            console.error('Error fetching complaint:', error);
        }
    }

    saveReport(userId: string, startDate?: string, endDate?: string) {
        this.isLoading = true;

        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;

        this.reportService.saveReportResponse(userId, start, end)
            .subscribe({
                next: (response) => {
                    this.isLoading = false;
                    this.reports.push(response);
                },
                error: (err) => {
                    console.error('Erreur génération:', err);
                    this.isLoading = false;
                }
            });
    }

}
