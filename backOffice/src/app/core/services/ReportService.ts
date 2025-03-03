import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from '../models/complaint';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    constructor(private http: HttpClient) {}
    private baseUrl: string = 'http://localhost:8091/api/v1/report';

    getReportsByUserId(userId: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${userId}`);
    }

}
