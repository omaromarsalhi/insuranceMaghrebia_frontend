import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { earningLineChart, salesAnalyticsDonutChart, ChatData } from './data';
import { ChartType, ChatMessage } from './saas.model';
import { ConfigService } from '../../../core/services/config.service';

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

  constructor(public formBuilder: FormBuilder, private configService: ConfigService) { }
  get form() {
    return this.formData.controls;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Saas', active: true }];
    this._fetchData();
    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
    this.configService.getConfig().subscribe(response => {
      this.sassEarning = response.sassEarning;
      this.sassTopSelling = response.sassTopSelling;
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
      case "january":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2007.35",
            revenue: "0.2",
            time: "From previous period",
            month: "Last month",
            previousamount: "$784.04",
            series: [
              {
                name: "series1",
                data: [22, 35, 20, 41, 51, 42, 49, 45, 58, 42, 75, 48],
              },
            ],
          },
        ];
        break;
      case "december":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2007.35",
            revenue: "0.2",
            time: "From previous period",
            month: "Last month",
            previousamount: "$784.04",
            series: [
              {
                name: "series1",
                data: [22, 28, 31, 34, 40, 52, 29, 45, 68, 60, 47, 12],
              },
            ],
          },
        ];
        break;
      case "november":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2887.35",
            revenue: "0.4",
            time: "From previous period",
            month: "Last month",
            previousamount: "$684.04",
            series: [
              {
                name: "series1",
                data: [28, 30, 48, 50, 47, 40, 35, 48, 56, 42, 65, 41],
              },
            ],
          },
        ];
        break;
      case "october":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2100.35",
            revenue: "0.4",
            time: "From previous period",
            month: "Last month",
            previousamount: "$674.04",
            series: [
              {
                name: "series1",
                data: [28, 48, 39, 47, 48, 41, 28, 46, 25, 32, 24, 28],
              },
            ],
          },
        ];
        break;
    }
  }

}
