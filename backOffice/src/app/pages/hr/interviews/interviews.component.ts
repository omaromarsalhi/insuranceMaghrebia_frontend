import { Component, OnInit } from '@angular/core';
import { Interview } from 'src/app/core/models/hr/interview';
import { InterviewStatus } from 'src/app/core/models/hr/interview-status';
import { InterviewService } from 'src/app/core/services/hr/interview.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  interviews: Interview[];
  interview : Interview;
  constructor(private interviewService:InterviewService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Hr' }, { label: 'Interviews List', active: true }];
    this.interviewService.getAllInterviews().subscribe(
      (data)=> {
        this.interviews=data;
      }
    )
  }
  cancel(interview: any){
    this.interview=interview;
    this.interviewService.cancel(interview.id).subscribe(
      (data)=> {
        this.interview.status=InterviewStatus.CANCELLED;
      }
    );
  }
}
