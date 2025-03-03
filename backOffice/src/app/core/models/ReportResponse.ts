import {ActionStrategy} from './ActionStrategy';

export interface ReportResponse {
    userAnalysis: string;
    classification: string;
    actions: ActionStrategy[];
    createdAt: string;
    userId: string;
}


