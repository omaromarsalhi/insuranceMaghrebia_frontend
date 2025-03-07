import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {Table} from './advanced.model';
import {editableTable, tableData} from './data';
import {AdvancedService} from './advanced.service';
import {AdvancedSortableDirective} from './advanced-sortable.directive';
import {NgForm} from '@angular/forms';
import {ReportService} from '../../../core/services/ReportService';
import {ReportResponse} from '../../../core/models/ReportResponse';

@Component({
    selector: 'app-advancedtable',
    templateUrl: './advancedtable.component.html',
    styleUrls: ['./advancedtable.component.scss'],
    providers: [AdvancedService, DecimalPipe]
})
export class AdvancedtableComponent implements OnInit {

    breadCrumbItems: Array<{}>;
    tableData: Table[];
    public selected: any;
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

    reports: ReportResponse[] = [];
    @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;
    public isCollapsed = true;

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
        console.log(this.reports);

    }

    openReportDetails(report: any): void {
        this.selectedReport = report;
    }


    toggleReportForm(userIndex: number): void {
        this.users[userIndex].showReportForm = !this.users[userIndex].showReportForm;
        if (!this.users[userIndex].showReportForm) {
            this.resetReportForm();
        }
    }

    toggleReport(index: number): void {
        this.users[index].showReport = !this.users[index].showReport;
        this.users[index].showAnalysisForm = false; // Réinitialiser le formulaire
    }

    generateReport(userIndex: number, form?: NgForm): void {
        if (form && form.invalid) {
            return;
        }
        const newReport = {
            date: this.newReport.date,
            status: this.newReport.status,
            details: this.newReport.details
        };

        this.users[userIndex].reports.unshift(newReport);
        this.resetReportForm();
        this.toggleReportForm(userIndex);
    }

    generateAIAnalysis(userIndex: number): void {
        console.log('Génération du rapport pour:', this.users[userIndex].name);
        console.log('Date sélectionnée:');
        this.users[userIndex].showAnalysisForm = false;
    }

    showAnalysisForm(userIndex: number): void {
        this.users[userIndex].showReport = true;
        this.users[userIndex].showAnalysisForm = true;
    }

    private resetReportForm(): void {
        this.newReport = {
            date: new Date().toISOString().split('T')[0],
            status: 'Nouveau',
            details: ''
        };
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

}
