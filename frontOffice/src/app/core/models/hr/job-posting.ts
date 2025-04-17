import { JobType } from "./job-type";
import { SalaryType } from "./salary-type";

export interface JobPosting {
  id?: string;
  title: string;
  description: string;
  isOpen?: boolean;
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
  skillsRequired: Set<string>;
  postedDate : Date;
}
