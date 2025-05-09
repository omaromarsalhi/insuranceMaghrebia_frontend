import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ComplaintResponseService {
    private baseUrl = 'http://localhost:9040/api/v1/api/v1/complaintResponse';

    constructor(private http: HttpClient) {
    }


    addResponse(response: any, responderId: string, complaintId: string): Observable<any> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(
            `${this.baseUrl}/${responderId}/${complaintId}`,
            JSON.stringify(response),
            {headers}
        );
    }


    getResponseByComplaintId(complaintId: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${complaintId}`);
    }

    deleteResponse(response: any): Observable<any> {
        return this.http.request('delete', `${this.baseUrl}`, {body: response});
    }

    markAsSeen(responseId: string): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/${responseId}`, {});
    }

    getAllResponses(): Observable<any> {
        return this.http.get<any>(this.baseUrl);
    }
}
