import { PaymentPlan } from "./PaymentsPlan";

export interface Payment {
    contractPaymentId: string
    userId?: string;
    offerId?: string;
    totalAmount?: number;
    planDuration?: string;
    paymentStatus: string;
    contractCreatedAt: Date;
    contractUpdatedAt: Date;
    paymentPlans: PaymentPlan[];
}
