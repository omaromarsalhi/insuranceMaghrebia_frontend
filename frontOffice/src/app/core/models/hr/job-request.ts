import { JobType } from "./job-type";
import { SalaryType } from "./salary-type";

export interface JobRequest {
  title: string;
  description: string;
  numberOfOpenings: number;
  minimumYearsOfExperience: number;
  startWorkingHour: string;
  endWorkingHour: string;
  workingDaysPerWeek: number;
  salaryAmount: number;
  salaryType: SalaryType;
  numberOfVacations: number;
  location: string;
  jobType: JobType;
  skillsRequired: string[];
}
