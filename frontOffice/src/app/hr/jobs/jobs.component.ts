import { Component, OnInit } from '@angular/core';
import { JobPostingService } from 'src/app/core/services/hr/job-posting.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: any;
  constructor(private jobService : JobPostingService){}
  ngOnInit(): void {
    this.jobService.getAllJobPostingsAvailable().subscribe({
      next : (data) => {
        this.jobs=data;
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  

}
