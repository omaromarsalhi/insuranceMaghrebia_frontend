import { PaymentPlan } from "./PaymentsPlan";

export interface PaymentResponseDto {
    contractPaymentId: string
    userId?: string;
    offerId?: string;
    fullName: String
    totalAmount?: number;
    planDuration?: string;
    paymentStatus: string;
    contractCreatedAt: Date;
    paymentPlans: PaymentPlan[];
}
