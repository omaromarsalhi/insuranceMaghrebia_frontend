import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobPosting } from 'src/app/core/models/hr/job-posting';
import { JobRequest } from 'src/app/core/models/hr/job-request';
import { JobType } from 'src/app/core/models/hr/job-type';
import { SalaryType } from 'src/app/core/models/hr/salary-type';
import { JobPostingService } from 'src/app/core/services/hr/job-posting.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  submitted = false;
  jobForm: FormGroup;
  JobType = JobType;
  SalaryType = SalaryType;
  skillData: FormGroup;

  constructor(private jobPostingService: JobPostingService, private formBuilder: FormBuilder, private router: Router) {
    this.skillData = this.formBuilder.group({
      skillValue: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Hr' }, { label: 'Add Job', active: true }];
    this.jobForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      numberOfOpenings: [null],
      minimumYearsOfExperience: [null],
      startWorkingHour: ['09:00', [Validators.required]],
      endWorkingHour: ['17:00', [Validators.required]],
      workingDaysPerWeek: ['', [Validators.required]],
      salaryAmount: ['', [Validators.required]],
      salaryType: [SalaryType.MONTHLY, [Validators.required]],
      numberOfVacations: [null],
      location: ['', [Validators.required]],
      jobType: ['FULL_TIME', [Validators.required]],
    });
  }

  skilldata(): FormArray {
    return this.skillData.get('skillValue') as FormArray;
  }

  skill(): FormGroup {
    return this.formBuilder.group({
      skillRequired: ''
    });
  }

  addSkill() {
    this.skilldata().push(this.skill());
  }

  deleteSkill(i: number) {
    this.skilldata().removeAt(i);
  }

  get f() {
    return this.jobForm.controls;
  }

  save() {
    this.submitted = true;
    if (!this.jobForm.invalid) {
      const skillsRequired = this.skilldata().controls.map(control => control.value.skillRequired);

      const jobRequest: JobRequest = {
        title: this.f.title.value,
        description: this.f.description.value,
        numberOfOpenings: this.f.numberOfOpenings.value ?? null,
        minimumYearsOfExperience: this.f.minimumYearsOfExperience.value ?? null,
        startWorkingHour: this.f.startWorkingHour.value,
        endWorkingHour: this.f.endWorkingHour.value,
        workingDaysPerWeek: this.f.workingDaysPerWeek.value,
        salaryAmount: this.f.salaryAmount.value,
        salaryType: this.f.salaryType.value,
        numberOfVacations: this.f.numberOfVacations.value ?? null,
        location: this.f.location.value,
        jobType: this.f.jobType.value,
        skillsRequired: skillsRequired
      };
      this.jobPostingService.createJobPosting(jobRequest).subscribe(
        (data) => {
          this.router.navigate(['/hr/jobs']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}