import { Injectable } from '@angular/core';
import { CreateIncidentTypeDTO } from '../DTOs/CreateIncidentTypeDTO';
import { IncidentType } from '../../models/IncidentType';

@Injectable({
  providedIn: 'root'
})
export class IncidentTypeMapper{
  ToCreateIncidentTypeDTO(incidentType: IncidentType):CreateIncidentTypeDTO{
    var dto: CreateIncidentTypeDTO = new CreateIncidentTypeDTO;
    dto.name = incidentType.name;
    dto.description = incidentType.description;
    dto.active = incidentType.active;
    console.log(dto);
    return dto;
  }
}