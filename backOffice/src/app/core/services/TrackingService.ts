import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TrackingService {
    constructor(private http: HttpClient) {
    }

    private baseUrl: string = 'http://localhost:8091/api/v1/api/v1/userTrack';


    getUserScoresPerDay(userId: string): Observable<Map<string, number>> {
        return this.http.get<Map<string, number>>(`${this.baseUrl}/${userId}`);
    }
}
