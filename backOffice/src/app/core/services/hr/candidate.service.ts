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

  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.apiUrl}/all`);
  }

  getCandidateById(id: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}/${id}`);
  }

  createCandidate(candidate: CandidateRequest, jobId: string): Observable<Candidate> {
    return this.http.post<Candidate>(`${this.apiUrl}/add?jobId=${jobId}`, candidate);
  }
}
