export interface ResponseComplaint {
  responseId?: string;
  complaintId: string;
  responderId: string;
  responseDescription: string;
  createdAt: Date;
  isSeen: boolean;
}
