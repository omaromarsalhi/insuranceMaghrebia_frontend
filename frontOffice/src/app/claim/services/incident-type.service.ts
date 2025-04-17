import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IncidentTypeMapper } from '../transfer/mappers/IncidentTypeMapper';
import { IncidentType } from '../models/IncidentType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentTypeService {

  constructor(private httpClient: HttpClient, private incidentTypeMapper: IncidentTypeMapper) { }
  path: string = "http://localhost:8888/api/v1/incident_type"
  addIncidentType(incidentType: IncidentType){
    return this.httpClient.post(this.path, this.incidentTypeMapper.ToCreateIncidentTypeDTO(incidentType))
  }

  findAllIncidentTypes():Observable<IncidentType[]>{
    return this.httpClient.get<IncidentType[]>(this.path);
  }
  findIncidentTypes(status: boolean):Observable<IncidentType[]>{
    const params = new HttpParams()
          .set('active', status)
          
    return this.httpClient.get<IncidentType[]>(this.path, {params});
  }

  deleteIncidentType(id: string){
    return this.httpClient.delete(this.path + "/" + id.toString())
  }

}
