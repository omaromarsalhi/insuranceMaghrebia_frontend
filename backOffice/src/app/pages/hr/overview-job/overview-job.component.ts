import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobPosting } from 'src/app/core/models/hr/job-posting';
import { JobType } from 'src/app/core/models/hr/job-type';
import { JobPostingService } from 'src/app/core/services/hr/job-posting.service';

@Component({
  selector: 'app-overview-job',
  templateUrl: './overview-job.component.html',
  styleUrls: ['./overview-job.component.scss']
})
export class OverviewJobComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  id: string;
  job: any;
  JobType = JobType;
  constructor(private route: ActivatedRoute,private jobService : JobPostingService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get("id");
    this.breadCrumbItems = [{ label: 'Job List' }, { label: 'Job Overview', active: true }];
    this.jobService.getJobPostingById(this.id).subscribe(
      (data) => {
        this.job=data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }

}
