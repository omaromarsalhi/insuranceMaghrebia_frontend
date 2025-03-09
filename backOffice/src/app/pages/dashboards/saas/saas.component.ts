import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChatData, earningLineChart, salesAnalyticsDonutChart} from './data';
import {ChartType, ChatMessage} from './saas.model';
import {ConfigService} from '../../../core/services/config.service';
import {TrackingService} from '../../../core/services/TrackingService';

@Component({
    selector: 'app-saas',
    templateUrl: './saas.component.html',
    styleUrls: ['./saas.component.scss']
})
/**
 * Saas-dashboard component
 */
export class SaasComponent implements OnInit, AfterViewInit {

    @ViewChild('scrollRef') scrollRef;
    breadCrumbItems: Array<{}>;
    earningLineChart: ChartType;
    salesAnalyticsDonutChart: ChartType;
    ChatData: ChatMessage[];
    sassEarning: Array<Object>;
    sassTopSelling: Array<Object>;
    formData: FormGroup;
    scores: Map<string, number> = new Map();


    constructor(public formBuilder: FormBuilder,
                private configService: ConfigService,
                private trakingService: TrackingService) {
    }

    get form() {
        return this.formData.controls;
    }

    ngOnInit(): void {
        this.breadCrumbItems = [{label: 'Dashboards'}, {label: 'Saas', active: true}];
        this._fetchData();
        this.formData = this.formBuilder.group({
            message: ['', [Validators.required]],
        });
        this.configService.getConfig().subscribe(response => {
            this.sassEarning = response.sassEarning;
            this.sassTopSelling = response.sassTopSelling;
        });
        this.trakingService.getUserScoresPerDay('67a9157f0a6a1371dce93411').subscribe((data) => {
            this.scores = data;
            console.log('scoreValues');
            this.updateChartData();

        });
    }

    private _fetchData() {
        this.earningLineChart = earningLineChart;
        this.salesAnalyticsDonutChart = salesAnalyticsDonutChart;
        this.ChatData = ChatData;
    }

    ngAfterViewInit() {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop = 500;
    }


    selectMonth(value) {
        switch (value) {
            case 'january':
                this.sassEarning = [
                    {
                        name: 'This month',
                        amount: '$2007.35',
                        revenue: '0.2',
                        time: 'From previous period',
                        month: 'Last month',
                        previousamount: '$784.04',
                        series: [
                            {
                                name: 'series1'
                                // data: [22, 35, 20, 41, 51, 42, 49, 45, 58, 42, 75, 48],
                            },
                        ],
                    },
                ];
                break;
            case 'december':
                this.sassEarning = [
                    {
                        name: 'This month',
                        amount: '$2007.35',
                        revenue: '0.2',
                        time: 'From previous period',
                        month: 'Last month',
                        previousamount: '$784.04',
                        series: [
                            {
                                name: 'series1',
                                data: [22, 28, 31, 34, 40, 52, 29, 45, 68, 60, 47, 12],
                            },
                        ],
                    },
                ];
                break;
            case 'november':
                this.sassEarning = [
                    {
                        name: 'This month',
                        amount: '$2887.35',
                        revenue: '0.4',
                        time: 'From previous period',
                        month: 'Last month',
                        previousamount: '$684.04',
                        series: [
                            {
                                name: 'series1',
                                data: [28, 30, 48, 50, 47, 40, 35, 48, 56, 42, 65, 41],
                            },
                        ],
                    },
                ];
                break;
            case 'october':
                this.sassEarning = [
                    {
                        name: 'This month',
                        amount: '$2100.35',
                        revenue: '0.4',
                        time: 'From previous period',
                        month: 'Last month',
                        previousamount: '$674.04',
                        series: [
                            {
                                name: 'series1',
                                data: [28, 48, 39, 47, 48, 41, 28, 46, 25, 32, 24, 28],
                            },
                        ],
                    },
                ];
                break;
        }
    }

    updateChartData(): void {
        const dates = Object.keys(this.scores);
        const scoreValues = Object.values(this.scores);

        console.log(scoreValues);
        this.earningLineChart = {
            series: [
                {
                    name: 'Scores',
                    data: scoreValues,  // Données de la série
                },
            ],
            chart: {
                height: 288,  // Hauteur du graphique
                type: 'line',  // Type de graphique (ligne)
                toolbar: {
                    show: false,  // Masque la barre d'outils
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
                enabled: false,  // Désactive les étiquettes de données
            },
            colors: ['#556ee6'],  // Couleur de la ligne
            stroke: {
                curve: 'smooth',  // Type de courbe (lisse)
                width: 3,  // Largeur de la ligne
            },
            xaxis: {
                categories: dates,  // Catégories de l'axe X (dates)
            },
            yaxis: {
                min: 0,  // Valeur minimale de l'axe Y
                max: 100,  // Valeur maximale de l'axe Y
                title: {
                    text: 'Scores',  // Titre de l'axe Y
                },
            },
            tooltip: {
                enabled: true,  // Active les info-bulles
                shared: false,  // Info-bulle partagée
            },
            grid: {
                borderColor: '#e7e7e7',  // Couleur de la grille
                strokeDashArray: 4,  // Type de ligne de la grille (pointillé)
            },
            responsive: [
                {
                    breakpoint: 600,  // Pour les petits écrans (mobiles)
                    options: {
                        chart: {
                            height: 240,  // Hauteur du graphique sur mobile
                        },
                    },
                },
            ],
            title: {
                text: 'Scores Over Time',  // Titre du graphique
                align: 'left',  // Alignement du titre
            },
        };
    }


}
