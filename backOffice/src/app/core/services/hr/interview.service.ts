import { Injectable } from '@angular/core';
import { Interview } from '../../models/hr/interview';
import { InterviewRequest } from '../../models/hr/interview-request';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private apiUrl = `http://localhost:8888/api/v1/interview`;

  constructor(private http: HttpClient) { }

  getAllInterviews(): Observable<Interview[]> {
    return this.http.get<Interview[]>(`${this.apiUrl}/all`);
  }

  getInterviewById(id: string): Observable<Interview> {
    return this.http.get<Interview>(`${this.apiUrl}/${id}`);
  }

  createInterview(candidateId: string, interview: InterviewRequest): Observable<Interview> {
    return this.http.post<Interview>(`${this.apiUrl}/add?candidateId=${candidateId}`, interview);
  }

  cancel(id:string):Observable<Interview> {
    return this.http.post<Interview>(`${this.apiUrl}/cancel?id=${id}`, id);
  }

}
