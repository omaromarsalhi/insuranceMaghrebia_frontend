import {ActionStrategy} from './ActionStrategy';

export interface ReportResponse {
  id: string;
    userAnalysis: string;
    classification: string;
    actions: ActionStrategy[];
    createdAt: string;
    userId: string;
}


