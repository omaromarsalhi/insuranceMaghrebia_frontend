import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from '../models/complaint';

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
  updateStatus(idComplaint: string, status: string): Observable<string> {
    return this.http.put(`${this.baseUrl}/${idComplaint}/${status}`, null, { responseType: 'text' });
  }

  getComplaintsByType(type: string): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/getType/${type}`);
  }


  deleteComplaint(complaint: Complaint): Observable<any> {
    return this.http.delete(`${this.baseUrl}`, { body: complaint });
  }
}
