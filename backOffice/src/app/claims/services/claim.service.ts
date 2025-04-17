import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateClaimDTO } from '../transfer/DTOs/CreateClaimDTO';
import { Claim } from '../models/claim';
import { root } from 'rxjs/internal-compatibility';
import { DamageReport } from '../transfer/DTOs/DamageReport';


@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  rootPath: string = "http://localhost:8888/api/v1/claim"
  geminiPath: string = "http://127.0.0.1:8000/process-image"

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

  toggleClosed(id:string, isClosed: boolean){
    const params = new HttpParams()
      .set('isClosed', !isClosed);
      return this.httpClient.patch(`${this.rootPath}/${id}`, null, {params})
  }
  getDamageEstimate(image: string): Observable<DamageReport>{
    return this.httpClient.post<DamageReport>(this.geminiPath, {"image":image.split(',')[1]},{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
