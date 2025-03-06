import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../../models/hr/candidate';
import { CandidateRequest } from '../../models/hr/candidate-request';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'http://localhost:8888/api/v1/candidate';

  constructor(private http: HttpClient) { }

  getAllCandidates(id : string): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.apiUrl}/all?jobId=${id}`);
  }

  getCandidateById(id: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}/${id}`);
  }

  createCandidate(candidate: CandidateRequest, jobId: string): Observable<Candidate> {
    const formData = new FormData();
    formData.append("firstname", candidate.firstname);
    formData.append("lastname", candidate.lastname);
    formData.append("email", candidate.email);
    formData.append("resume", candidate.resume, candidate.resume.name); 
    formData.append("coverLetter", candidate.coverLetter, candidate.coverLetter.name); 
    return this.http.post<Candidate>(`${this.apiUrl}/add?jobId=${jobId}`, formData);
  }
}
