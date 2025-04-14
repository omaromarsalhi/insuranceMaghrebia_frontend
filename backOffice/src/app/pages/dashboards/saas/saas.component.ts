import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChatData, earningLineChart, salesAnalyticsDonutChart} from './data';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ChartType, ChatMessage} from './saas.model';
import {ConfigService} from '../../../core/services/config.service';
import {TrackingService} from '../../../core/services/TrackingService';
import {ActivatedRoute} from '@angular/router';
import {ReportResponse} from '../../../core/models/ReportResponse';
import {Action} from '../../../core/models/Action';
import {ReportService} from '../../../core/services/ReportService';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {AssistantService} from '../../../core/services/AssistantService';

@Component({
    selector: 'app-saas',
    templateUrl: './saas.component.html',
    styleUrls: ['./saas.component.scss']
})

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
    scores: Map<Date, number> = new Map();
    reportId: string | null = null;
    reportResponse: ReportResponse;
    iAnalysis: any;
    type: any;
    userActivities: Action[];
    assistantPrompt: string | null = null;
    userAnswer = '';
    isLoading = false;

    messages: any[] = [];
    timelineCarousel: OwlOptions = {
        items: 1,
        loop: false,
        margin: 0,
        nav: true,
        navText: ['<i class=\'mdi mdi-chevron-left\'></i>', '<i class=\'mdi mdi-chevron-right\'></i>'],
        dots: false,
        responsive: {
            680: {
                items: 4
            },
        }
    };

    constructor(public formBuilder: FormBuilder,
                private configService: ConfigService,
                private trakingService: TrackingService,
                private reportService: ReportService,
                private route: ActivatedRoute,
                private modalService: NgbModal,
                private assistantService: AssistantService) {
    }

    get form() {
        return this.formData.controls;
    }

    openModal(content: any) {
        this.modalService.open(content, {centered: true, size: 'lg'});
    }

    ngOnInit(): void {
        this._fetchData();
        this.configService.getConfig().subscribe(response => {
            this.sassEarning = response.sassEarning;
            this.sassTopSelling = response.sassTopSelling;
        });
        this.route.params.subscribe(async (params) => {
            this.reportId = params.id;
            this.reportService.getReportById(this.reportId).subscribe(data => {
                this.reportResponse = data;
                this.userActivities = this.reportResponse.activityList;
                this.scores = this.reportResponse.dailyScores;
                this.updateChartData();
                this.updateAvailableMonths();
                this.updateDonutChart();


            });
        });
        this.formData = this.formBuilder.group({
            message: ['', [Validators.required]],
        });

        this.assistantService.getMessages().subscribe((msg: any) => {
            this.messages.push(msg);
            if (msg.prompt) {

                this.assistantPrompt = msg.prompt;
            } else {
                setTimeout(() => {
                    this.modalService.dismissAll();
                    this.isLoading = false;
                    this.userAnswer = '';
                    this.assistantPrompt = null;
                }, 500);
            }
        });
    }

    open(emailContent: any) {
        this.modalService.open(emailContent, {centered: true});
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
        const combined = dates.map((date, index) => [new Date(date).getTime(), scoreValues[index]]);
        combined.sort((a, b) => a[0] - b[0]);
        const sortedDates = combined.map(item => new Date(item[0]).toISOString().split('T')[0]);  // Format 'YYYY-MM-DD'
        const sortedScores = combined.map(item => item[1]);
        this.earningLineChart = {
            series: [
                {
                    name: 'Scores',
                    data: sortedScores,
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
                categories: sortedDates,
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

    updateDonutChart(): void {
        const labels = Object.keys(this.reportResponse.percentages);
        const series = Object.values(this.reportResponse.percentages);
        this.salesAnalyticsDonutChart = {
            series,
            chart: {
                type: 'donut',
                height: 240,
            },
            labels,
            colors: ['#556ee6', '#f46a6a', '#34c38f'],
            legend: {
                show: false,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                    },
                },
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

    sendResponse(modal: NgbModalRef) {
        this.isLoading = true;
        this.assistantService.sendUserInput(JSON.stringify({value: this.userAnswer}));
        setTimeout(() => {
            this.isLoading = false;
            this.userAnswer = '';
        }, 1500);
    }

    getPercentage(key: string): number | undefined {
        console.log(this.reportResponse.percentages);
        return this.reportResponse.percentages[key];
    }


}
