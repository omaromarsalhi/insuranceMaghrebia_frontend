import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TrackingService {
    constructor(private http: HttpClient) {
    }

    private baseUrl: string = 'http://localhost:9041/api/v1/api/v1/userTrack';


    getUserScoresPerDay(userId: string, startDate?: string, endDate?: string): Observable<Map<string, number>> {
        let params = new HttpParams();

        if (startDate) {
            params = params.set('startDate', startDate);
        }
        if (endDate) {
            params = params.set('endDate', endDate);
        }

        return this.http.get<Map<string, number>>(`${this.baseUrl}/${userId}`, { params });
    }
}
