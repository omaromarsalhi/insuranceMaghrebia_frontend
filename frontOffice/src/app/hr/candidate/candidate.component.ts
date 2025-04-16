import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { error } from 'jquery';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { CandidateRequest } from 'src/app/core/models/hr/candidate-request';
import { CandidateService } from 'src/app/core/services/hr/candidate.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  id!: string | null;
  candidateForm!: FormGroup;
  coverLetterName: string | null = null;
  resumeName: string | null = null;
  coverLetterError: string | null = null;
  resumeError: string | null = null;
  submitted = false;
  successMessage: string | null = null;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,private candidateService : CandidateService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.candidateForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      coverLetter: [null, [Validators.required]],
      resume: [null, [Validators.required]]
    });
  }

  onFileSelect(event: NgxFileDropEntry[], fileType: string): void {
    if (event.length > 0) {
      const droppedFile = event[0];

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Check if file type is PDF
          if (file.type !== 'application/pdf') {
            if (fileType === 'coverLetter') {
              this.coverLetterError = 'Only PDF files are allowed.';
            } else if (fileType === 'resume') {
              this.resumeError = 'Only PDF files are allowed.';
            }
            return;
          }
          if (fileType === 'coverLetter') {
            this.coverLetterName = null; 
            this.coverLetterError = null; 
          } else if (fileType === 'resume') {
            this.resumeName = null; 
            this.resumeError = null; 
          }
  
          // Ensure only one file is allowed
          if (fileType === 'coverLetter' && event.length>1) {
            this.coverLetterError = 'Only one file is allowed.';
            return;
          }
          if (fileType === 'resume' && event.length>1) {
            this.resumeError = 'Only one file is allowed.';
            return;
          }

          // Store file information
          if (fileType === 'coverLetter') {
            this.candidateForm.patchValue({ coverLetter: file });
            this.coverLetterName = file.name;
            this.coverLetterError = null;
          } else if (fileType === 'resume') {
            this.candidateForm.patchValue({ resume: file });
            this.resumeName = file.name;
            this.resumeError = null;
          }
        });
      }
    }
  }

  removeFile(fileType: string): void {
    if (fileType === 'coverLetter') {
      this.candidateForm.patchValue({ coverLetter: null });
      this.coverLetterName = null;
      this.coverLetterError = null;
    } else if (fileType === 'resume') {
      this.candidateForm.patchValue({ resume: null });
      this.resumeName = null;
      this.resumeError = null;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.coverLetterName) {
      this.coverLetterError = 'Cover letter is required.';
    }
    if (!this.resumeName) {
      this.resumeError = 'Resume is required.';
    }
    if (this.candidateForm.valid && !this.resumeError && !this.coverLetterError) {
      const candidateRequest: CandidateRequest = {
        firstname: this.candidateForm.get('firstname')?.value,
        lastname: this.candidateForm.get('lastname')?.value,
        email: this.candidateForm.get('email')?.value,
        resume: this.candidateForm.get('resume')?.value, 
        coverLetter: this.candidateForm.get('coverLetter')?.value
      };
      this.candidateService.createCandidate(candidateRequest, this.id!).subscribe(response => {
        this.successMessage = 'Your application has been submitted successfully! We will contact you for interview scheduling.';
        setTimeout(() => {
          this.successMessage = null;
          this.candidateForm.reset();
          this.submitted = false;
          this.coverLetterName = null;
          this.resumeName = null;
        }, 5000);
      });
    }
  }
}
