import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { signatureRequest } from '../../models/signature/signatureRequest';

const cabecera = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
    providedIn: 'root'
})
export class SignatureService {

    private apiUrl = 'http://localhost:9020/api/v1/signature';

    constructor(private http: HttpClient) { }

    getApiUrl(): string {
        return this.apiUrl;
    }

    public verifySignature(signatureRequest: signatureRequest): Observable<any> {
        return this.http.post<any>(this.apiUrl + '', signatureRequest, cabecera);
    }

}
