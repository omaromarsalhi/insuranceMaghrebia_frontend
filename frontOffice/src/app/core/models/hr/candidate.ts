import { CandidateStatus } from "./candidate-status";

export interface Candidate {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  resume: string;
  coverLetter: string;
  appliedJobId?: string;
  applicationDate?: Date;
  status?: CandidateStatus;
}