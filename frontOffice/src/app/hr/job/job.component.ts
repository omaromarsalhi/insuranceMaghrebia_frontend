import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobPostingService } from 'src/app/core/services/hr/job-posting.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  id!:string | null;
  job : any;
  constructor(private route : ActivatedRoute,private jobService : JobPostingService) {
  }
  ngOnInit(): void {
    this.id=this.route.snapshot.queryParamMap.get("id");
    this.jobService.getJobPostingById(this.id!).subscribe(
      {
        next : (data) => {
          this.job=data
        },
        error : (err) => {
          console.log(err);
        }
      }
    )
  }
  formatWorkingHours(startTime: string, endTime: string, workingDays: number): string {
    const start = this.formatTime(startTime);
    const end = this.formatTime(endTime);
    return `${start} - ${end} (weekly ${workingDays} days)`;
  }
  
  formatTime(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'pm' : 'am';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}${period}`;
  }
  

}
