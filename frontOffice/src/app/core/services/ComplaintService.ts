import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Complaint} from "../models/Complaint";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private baseUrl: string = 'http://localhost:8090/api/v1/api/v1/complaint';

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


  getComplaintsByType(type: string): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/getType/${type}`);
  }


  deleteComplaint(complaint: Complaint): Observable<any> {
    return this.http.delete(`${this.baseUrl}`, { body: complaint });
  }
  // getSuggestedTitle(description: string): Observable<string> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const body = { description };
  //
  //   return this.http.post<string>(`${this.baseUrl}/getTitle`, body, { headers });
  // }
  getSuggestedTitle(description: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/getTitle`, { description }, { responseType: 'text' as 'json' });
  }



}
