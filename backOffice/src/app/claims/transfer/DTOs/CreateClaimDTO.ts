import { ClaimStatus } from "../../models/claim";

export interface CreateClaimDTO {
  incidentTypeId: string;
  title: string;
  userId: string;
  incidentLocation: string;
  incidentDate: string;
  description: string;
  locationCoordinates: string;
}