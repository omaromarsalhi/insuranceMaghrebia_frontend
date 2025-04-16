import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    constructor(private http: HttpClient) {
    }

    private baseUrl: string = 'http://localhost:9041/api/v1/report';

    getReportsByUserId(userId: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${userId}`);
    }

    getReportById(reportId: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/getReportResponse/${reportId}`);
    }

    saveReportResponse(
        userId: string,
        startDate?: Date,
        endDate?: Date
    ): Observable<any> {
        // Construction des paramètres
        let params = new HttpParams();

        if (startDate) {
            params = params.append('startDate', startDate.toISOString());
        }

        if (endDate) {
            params = params.append('endDate', endDate.toISOString());
        }

        return this.http.post(
            `${this.baseUrl}/${userId}`,
            null,
            {params}
        );
    }

}
