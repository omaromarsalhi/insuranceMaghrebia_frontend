import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobType } from 'src/app/core/models/hr/job-type';
import { FileService } from 'src/app/core/services/hr/file.service';
import { JobPostingService } from 'src/app/core/services/hr/job-posting.service';
import { futureDateValidator } from './future-dateValidator';
import { InterviewService } from 'src/app/core/services/hr/interview.service';
import { InterviewRequest } from 'src/app/core/models/hr/interview-request';
import { Candidate } from 'src/app/core/models/hr/candidate';
import { CandidateStatus } from 'src/app/core/models/hr/candidate-status';
import { CandidateService } from 'src/app/core/services/hr/candidate.service';

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
  submitted=false;
  scheduleForm:FormGroup;
  candidat : Candidate;

  constructor(private route: ActivatedRoute,private jobService : JobPostingService,private fileSerice : FileService,private modalService: NgbModal,private formBuilder :FormBuilder,private interviewService:InterviewService,private candidateService :CandidateService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get("id");
    this.breadCrumbItems = [{ label: 'Job List' }, { label: 'Job Overview', active: true }];
    this.jobService.getJobPostingById(this.id).subscribe(
      (data) => {
        this.job=data;
        console.log(this.job);
      },
      (error) => {
        console.log(error);
      }
    );
    this.scheduleForm=this.formBuilder.group({
      location:['',[Validators.required]],
      scheduledDate:['',[Validators.required,futureDateValidator(2)]],
      id:['',[Validators.required]]
    });
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }

  downloadFile(filePath : string){
    this.fileSerice.downloadFile(filePath).subscribe(
      (data)=> {
        console.log(data);
      },
      (error)=> {
        console.log(error);
      }
    );
  }

  openModal(content: any,candidate : any) {
    this.scheduleForm.reset();
    this.f.id.setValue(candidate.id);
    this.candidat=candidate;
    this.modalService.open(content);
  }
  get f() {
    return this.scheduleForm.controls;
  }

  submitSchedule(){
    this.submitted=true;
    console.log(this.f.id.value);
    if (!this.scheduleForm.invalid) {
      const interviewRequest : InterviewRequest = {
        location : this.f.location.value,
        scheduledDate : new Date(this.f.scheduledDate.value)
      }
      this.interviewService.createInterview(this.f.id.value,interviewRequest).subscribe(
        (data)=> {
          this.modalService.dismissAll();
          this.candidat.status=CandidateStatus.INTERVIEW_SCHEDULED;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  reject(candidat : any){
    this.candidat=candidat;
     this.candidateService.reject(candidat.id).subscribe(
      (data)=> {
        this.candidat.status=CandidateStatus.REJECTED;
      }
    ); 
  }

  hire(candidat : any){
    this.candidat=candidat;
    this.candidateService.hire(candidat.id).subscribe(
      (data)=> {
        this.candidat.status=CandidateStatus.HIRED;
      }
    );
  }

  scrollModal(scrollDataModal: any,candidat : any) {
    this.modalService.open(scrollDataModal, { scrollable: true });
    this.candidat=candidat;
  }
}
