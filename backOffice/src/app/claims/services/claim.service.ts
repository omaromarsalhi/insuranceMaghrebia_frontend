import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateClaimDTO } from '../transfer/DTOs/CreateClaimDTO';
import { Claim } from '../models/claim';
import { root } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  rootPath: string = "http://localhost:9010/api/v1/claim"

  constructor(private httpClient: HttpClient) { }

  addClaim(claimDTO: CreateClaimDTO): Observable<any>{
    return this.httpClient.post(this.rootPath, claimDTO);
  }
  
  getClaims(): Observable<Claim[]> {
    return this.httpClient.get<Claim[]>(this.rootPath);
  }
  getClaim(id: string): Observable<Claim>{
    const params = new HttpParams()
      .set('includeImages', true)
      .set('includeResponses', true)
    return this.httpClient.get<Claim>(`${this.rootPath}/${id}`, {params});
  }
}
