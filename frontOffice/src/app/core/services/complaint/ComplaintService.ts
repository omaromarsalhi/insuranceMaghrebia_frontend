import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Complaint} from "../../models/complaint/Complaint";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private baseUrl: string = 'http://localhost:9040/api/v1/api/v1/complaint';

  constructor(private http: HttpClient) {}


  addComplaint(userId: string, complaint: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(`${this.baseUrl}/${userId}`, complaint);
  }
  getAllComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.baseUrl);
  }
  getComplaintById(id: string): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.baseUrl}/get/${id}`);
  }
  getComplaintsByUserId(userId: string): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/${userId}`);
  }
  getSuggestedTitle(description: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/getTitle`, { description }, { responseType: 'text' as 'json' });
  }



}
