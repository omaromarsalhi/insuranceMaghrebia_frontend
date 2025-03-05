import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobPosting } from '../../models/hr/job-posting';
import { JobRequest } from '../../models/hr/job-request';

@Injectable({
  providedIn: 'root'
})
export class JobPostingService {
  private apiUrl = `http://localhost:8888/api/v1/job-posting`;

  constructor(private http: HttpClient) { }

  getAllJobPostings(): Observable<JobPosting[]> {
    return this.http.get<JobPosting[]>(`${this.apiUrl}/all`);
  }

  getAllJobPostingsAvailable(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all/available`);
  }
  
  getJobPostingById(id: string): Observable<JobPosting> {
    return this.http.get<JobPosting>(`${this.apiUrl}/${id}`);
  }

  createJobPosting(job: JobRequest): Observable<any> {
    return this.http.post<JobPosting>(`${this.apiUrl}/add`, job);
  }
  closeJobPosting(id : string) : Observable<any> {
    return this.http.get(`${this.apiUrl}/close?id=${id}`);
  }
}
