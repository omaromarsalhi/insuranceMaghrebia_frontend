import { Component, OnInit } from '@angular/core';
import { JobPosting } from 'src/app/core/models/hr/job-posting';
import { JobRequest } from 'src/app/core/models/hr/job-request';
import { JobPostingService } from 'src/app/core/services/hr/job-posting.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  jobs: JobPosting[];
  constructor(private jobPostingService: JobPostingService,) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Hr' }, { label: 'Jobs List', active: true }];
    this.jobPostingService.getAllJobPostings().subscribe(
      (data) => {
        this.jobs = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(id: string) {
  }

  close(id: string) {
    this.jobPostingService.closeJobPosting(id).subscribe(
      (data) => {
        this.jobs = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
