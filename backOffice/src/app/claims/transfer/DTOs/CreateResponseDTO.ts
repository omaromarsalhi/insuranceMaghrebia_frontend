import { ClaimStatus } from "../../models/claim";

export class CreateResponseDTO{
  response: string;
  userId: string;
  claimId: string;
  claimStatus: ClaimStatus;
}