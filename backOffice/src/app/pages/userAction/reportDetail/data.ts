import { ChartType } from './reportDetail.model';

const earningLineChart: ChartType = {
    series: [{
        name: 'series1'
        // data: [5, 3, 9, 7, 0, 6, 3]
    }],
    chart: {
        height: 288,
        type: 'line',
        toolbar: 'false',
        dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 8,
            opacity: 0.2
        },
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#556ee6'],
    stroke: {
        curve: 'smooth',
        width: 3,
    },
};

const salesAnalyticsDonutChart: ChartType = {
    series: [],
    chart: {
        type: 'donut',
        height: 240,
    },
    labels: [],
    colors: [],
    legend: {
        show: false,
    },
    plotOptions: {
        pie: {
            donut: {
                size: '70%',
            }
        }
    }
};

const ChatData = [
    {
        name: 'Steven Franklin',
        message: 'Hello!',
        time: '10:00',
    },
    {
        align: 'right',
        name: 'Henry Wells',
        message: 'Hi, How are you? What about our next meeting?',
        time: '10:02'
    },
    {
        name: 'Steven Franklin',
        message: 'Yeah everything is fine',
        time: '10:06'
    },
    {
        name: 'Steven Franklin',
        message: '& Next meeting tomorrow 10.00AM',
        time: '10:06'
    },
    {
        align: 'right',
        name: 'Henry Wells',
        message: 'Wow that\'s great',
        time: '10:02'
    },
];

export { earningLineChart, salesAnalyticsDonutChart, ChatData };
