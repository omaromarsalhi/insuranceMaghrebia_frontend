import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {Table} from './advanced.model';
import {editableTable, tableData} from './data';
import {AdvancedService} from './advanced.service';
import {AdvancedSortableDirective} from './advanced-sortable.directive';
import {ReportService} from '../../../core/services/userAction/ReportService';
import {ReportResponse} from '../../../core/models/userAction/ReportResponse';

@Component({
    selector: 'app-reports',
    templateUrl: './advancedtable.component.html',
    styleUrls: ['./advancedtable.component.scss'],
    providers: [AdvancedService, DecimalPipe]
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

    reports: ReportResponse[] = [];
    @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;

    constructor(public service: AdvancedService,
                private reportService: ReportService) {
        this.tables$ = service.tables$;
        this.total$ = service.total$;
    }

    users = [
        {
            name: 'Latifa Ben Zaied',
            Email: 'Latifa.benzaied@esprit.tn',
            Gender: 'Male',
            age: 32,
            status: 'Active',
            showReport: false,
            showReportForm: false,
            showAnalysisForm: false,
            reports: [
                {
                    date: '10/03/2024',
                },
                {
                    date: '25/02/2024',
                }
            ]
        },
        {
            name: 'Marie Dubois',
            Email: 'Latifa.benzaied@esprit.tn',
            Gender: 'Femelle',
            age: 28,
            status: 'Active',
            showReport: false,
            showReportForm: false,
            reports: [
                {
                    date: '05/03/2024',
                },
                {
                    date: '28/02/2024',
                }
            ]
        }
    ];

    async ngOnInit() {
        this.breadCrumbItems = [{label: 'Tables'}, {label: 'Advanced Table', active: true}];
        this._fetchData();
        await this.getReports('67a9157f0a6a1371dce93411');

    }


    toggleReport(index: number): void {
        this.users[index].showReport = !this.users[index].showReport;
        this.users[index].showAnalysisForm = false; // Réinitialiser le formulaire
    }

    showAnalysisForm(userIndex: number): void {
        this.users[userIndex].showReport = true;
        this.users[userIndex].showAnalysisForm = true;
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

        this.reportService.saveReportResponse('67a9157f0a6a1371dce93411', start, end)
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
