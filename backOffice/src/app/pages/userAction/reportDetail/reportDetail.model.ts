// export interface ChartType {
//     chart?: any;
//     plotOptions?: any;
//     colors?: any;
//     series?: any;
//     stroke?: any;
//     labels?: any;
//     legend?: any;
//     type?: any;
//     height?: any;
//     dataLabels?: any;
//     xaxis?: {
//         categories: string[];
//     };
// }
export interface ChartType {
    chart?: any;
    plotOptions?: any;
    colors?: any;
    series?: any;
    stroke?: any;
    fill?: any;
    labels?: any;
    markers?: any;
    legend?: any;
    xaxis?: any;
    yaxis?: any;
    tooltip?: any;
    grid?: any;
    datasets?: any;
    options?: any;
    toolbar?: any;
    type?: any;
    height?: any;
    dataLabels?: any;
    sparkline?: any;
    responsive?: any;
    states?: any;
    title?: any;
    subtitle?: any;
}
export interface ChatMessage {
    align?: string;
    name?: string;
    message: string;
    time: string;
}
