import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Complaint} from "../models/Complaint";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private baseUrl: string = 'http://localhost:8090/api/v1/api/v1/complaint';  // Assurez-vous que cette URL est correcte

  constructor(private http: HttpClient) {}

  // Méthode pour ajouter une plainte
  addComplaint(userId: string, complaint: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(`${this.baseUrl}/${userId}`, complaint);
  }

  // Méthode pour obtenir toutes les plaintes
  getAllComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.baseUrl);
  }

  // Méthode pour obtenir une plainte par son ID
  getComplaintById(id: string): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.baseUrl}/get/${id}`);
  }

  // Méthode pour obtenir les plaintes d'un utilisateur spécifique
  getComplaintsByUserId(userId: string): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/${userId}`);
  }

  // Méthode pour obtenir les plaintes par type
  getComplaintsByType(type: string): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/getType/${type}`);
  }

  // Méthode pour supprimer une plainte
  deleteComplaint(complaint: Complaint): Observable<any> {
    return this.http.delete(`${this.baseUrl}`, { body: complaint });
  }
}
