import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Complaint} from '../../models/complaint/complaint';

@Injectable({
    providedIn: 'root'
})
export class ComplaintService {

    private baseUrl: string = 'http://localhost:9040/api/v1/api/v1/complaint';

    constructor(private http: HttpClient) {
    }

    getAllComplaints(): Observable<Complaint[]> {
        return this.http.get<Complaint[]>(this.baseUrl);
    }

    updateStatus(idComplaint: string, status: string): Observable<string> {
        return this.http.put(`${this.baseUrl}/${idComplaint}/${status}`, null, {responseType: 'text'});
    }
    getById(id: string): Observable<Complaint> {
        return this.http.get<Complaint>(`${this.baseUrl}/get/${id}`);
    }
}
