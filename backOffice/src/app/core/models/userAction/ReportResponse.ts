import {ActionStrategy} from './ActionStrategy';
import {Action} from './Action';

export interface ReportResponse {
    id: string;
    userAnalysis: string;
    classification: string;
    actions: ActionStrategy[];
    percentages: Map<string, number>;
    createdAt: string;
    userId: string;
    activityList: Action[];
    dailyScores: Map<Date, number>;
    engagementEvolution: number;

}


