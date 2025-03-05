import { InterviewStatus } from "./interview-status";

export interface Interview {
  id?: string;
  candidateId: string;
  scheduledDate: Date;
  location: string;
  status?: InterviewStatus;
}