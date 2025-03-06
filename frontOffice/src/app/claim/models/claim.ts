import { IncidentType } from "./IncidentType";
import { Response } from "./response";
import { User } from "./user";

export enum ClaimStatus {
  OPEN = 'OPEN',
  NEW = 'NEW',
  AWAITING_RESPONSE = 'AWAITING_RESPONSE',
  CLOSED = 'CLOSED'
}
export class Claim{
  incidentType!: IncidentType;
  id!: string;
  title!: string;
  user!: User;
  description!: string;
  incidentLocation!: string;
  locationCoordinates!: string;
  incidentDate!: Date;
  submitDate!: Date;
  status!: ClaimStatus;
  images!: string[];
  responses!: Response[];

}