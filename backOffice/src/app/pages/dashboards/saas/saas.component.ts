import {AfterViewInit, Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChatData, earningLineChart, salesAnalyticsDonutChart} from './data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ChartType, ChatMessage} from './saas.model';
import {ConfigService} from '../../../core/services/config.service';
import {TrackingService} from '../../../core/services/TrackingService';
import {ActivatedRoute} from '@angular/router';
import {ReportResponse} from '../../../core/models/ReportResponse';
import {ReportService} from '../../../core/services/ReportService';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
    selector: 'app-saas',
    templateUrl: './saas.component.html',
    styleUrls: ['./saas.component.scss']
})
/**
 * Saas-dashboard component
 */
export class SaasComponent implements OnInit, AfterViewInit {
    public Editor = ClassicEditor;
    @ViewChild('emailContent') emailContent!: TemplateRef<any>;
    @ViewChild('scrollRef') scrollRef;
    breadCrumbItems: Array<{}>;
    earningLineChart: ChartType;
    salesAnalyticsDonutChart: ChartType;
    ChatData: ChatMessage[];
    sassEarning: Array<Object>;
    sassTopSelling: Array<Object>;
    formData: FormGroup;
    availableMonths: { value: string, label: string }[] = [];
    scores: Map<string, number> = new Map();
    reportId: string | null = null;
    reportResponse: ReportResponse;
    iAnalysis: any;
    type: any;

    constructor(public formBuilder: FormBuilder,
                private configService: ConfigService,
                private trakingService: TrackingService,
                private reportService: ReportService,
                private route: ActivatedRoute,
                private modalService: NgbModal) {
    }

    get form() {
        return this.formData.controls;
    }
    userActivities = [
        { time: '09:00 AM', action: 'Visited the homepage' },
        { time: '10:30 AM', action: 'Visited the Insurance Auto page' },
        { time: '12:00 PM', action: 'Requested a quote'},
        { time: '02:30 PM', action: 'Updated profile information' }
    ];
    ngOnInit(): void {

        // this.iAnalysis = {
        //     userAnalysis: 'The user showed initial interest in car insurance, actively exploring details and requesting a quote...',
        //     classification: 'interested, hesitant',
        //     actions: {
        //         interested: [
        //             {
        //                 actionType: 'email',
        //                 description: 'Send a personalized email summarizing the car insurance quote and highlighting key benefits.'
        //             },
        //             {
        //                 actionType: 'webinar',
        //                 description: 'Invite the user to an online webinar showcasing the advantages of the chosen car insurance plan.'
        //             }
        //         ],
        //         hesitant: [
        //             {
        //                 actionType: 'email',
        //                 description: 'Send a follow-up email with a subject line like \'Your Car Insurance Quote is Ready!\''
        //             },
        //             {
        //                 actionType: 'call',
        //                 description: 'Schedule a brief follow-up call to address any remaining questions about the car insurance plan.'
        //             }
        //         ]
        //     }
        // };
        this.breadCrumbItems = [{label: 'Dashboards'}, {label: 'Saas', active: true}];
        this._fetchData();
        this.route.params.subscribe(async (params) => {
            this.reportId = params.id;
            this.reportService.getReportById(this.reportId).subscribe(data => {
                this.reportResponse = data;

            });
        });
        this.formData = this.formBuilder.group({
            message: ['', [Validators.required]],
        });
        this.configService.getConfig().subscribe(response => {
            this.sassEarning = response.sassEarning;
            this.sassTopSelling = response.sassTopSelling;
        });
        this.trakingService.getUserScoresPerDay('67a9157f0a6a1371dce93411').subscribe((data) => {
            this.scores = data;
            this.updateChartData();
            this.updateAvailableMonths();

        });
    }

    open(emailContent: any) {
        this.modalService.open(emailContent, { centered: true });
    }

    handleAction(action: any) {
        if (action === 'email') {
        this.open(this.emailContent);
        } else if (action === 'webinar') {
            console.log('webinar');
        } else if (action === 'call') {
            console.log('call');
        }
    }
    private _fetchData() {
        this.earningLineChart = earningLineChart;
        this.salesAnalyticsDonutChart = salesAnalyticsDonutChart;
        this.ChatData = ChatData;
    }

    ngAfterViewInit() {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop = 500;
    }

    updateAvailableMonths(): void {
        const dates = Object.keys(this.scores).map(date => new Date(date));
        if (dates.length === 0) {
            return;
        }

        dates.sort((a, b) => a.getTime() - b.getTime());
        const start = new Date(dates[0].getFullYear(), dates[0].getMonth(), 1);
        const end = new Date(dates[dates.length - 1].getFullYear(), dates[dates.length - 1].getMonth(), 1);

        const monthNames = ['janv', 'fevr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'dec'];
        const result: { value: string, label: string }[] = [];

        const current = new Date(start);
        while (current <= end) {
            const month = (current.getMonth() + 1).toString().padStart(2, '0');
            const year = current.getFullYear();

            result.push({
                value: `${year}-${month}`,     // utilisé pour filtrer
                label: `${monthNames[current.getMonth()]}`,  // affiché dans la liste
            });

            current.setMonth(current.getMonth() + 1);
        }

        this.availableMonths = result;
    }

    selectMonth(value: string): void {
        if (value === 'all') {
            this.updateChartData();
            return;
        }

        const filteredScores: { [key: string]: number } = {};
        for (const date in this.scores) {
            if (date.startsWith(value)) {
                filteredScores[date] = this.scores[date];
            }
        }
        const dates = Object.keys(filteredScores);
        const values = Object.values(filteredScores);

        // 3. Mettre à jour le graphique
        this.earningLineChart.series = [
            {
                name: 'Scores',
                data: values,
            },
        ];
        this.earningLineChart.xaxis = {
            categories: dates.map(dateStr => this.formatter(dateStr)),
        };
    }


    updateChartData(): void {
        const dates = Object.keys(this.scores);
        const scoreValues = Object.values(this.scores);
        this.earningLineChart = {
            series: [
                {
                    name: 'Scores',
                    data: scoreValues,
                },
            ],
            chart: {
                height: 288,
                type: 'line',
                toolbar: {
                    show: false,
                },
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 8,
                    opacity: 0.2,
                },
            },
            dataLabels: {
                enabled: false,
            },
            colors: ['#556ee6'],
            stroke: {
                curve: 'smooth',
                width: 3,
            },
            xaxis: {
                categories: dates,
                labels: {
                    formatter(value: string) {
                        const date = new Date(value);
                        const day = date.getDate().toString().padStart(2, '0');

                        const monthNames = ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];
                        const month = monthNames[date.getMonth()];

                        return `${day} ${month}`;
                    },
                },
            },
            yaxis: {
                min: 0,
                max: 100,
                title: {
                    text: 'Scores',
                },
            },
            tooltip: {
                enabled: true,
                shared: false,
            },
            grid: {
                borderColor: '#e7e7e7',
                strokeDashArray: 4,
            },
            responsive: [
                {
                    breakpoint: 600,
                    options: {
                        chart: {
                            height: 240,
                        },
                    },
                },
            ],
            title: {
                text: 'Scores Over Time',
                align: 'left',
            },
        };
    }

    formatter(value: string): string {
        const date = new Date(value);
        const day = date.getDate().toString().padStart(2, '0');

        const monthNames = ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];
        const month = monthNames[date.getMonth()];

        return `${day} ${month}`;
    }


}
