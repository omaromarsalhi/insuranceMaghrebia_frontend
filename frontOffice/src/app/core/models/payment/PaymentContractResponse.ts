import { PaymentPlan } from "./PaymentsPlan";

export interface PaymentContractResponse {
    contractPaymentId: string
    paymentPlans: PaymentPlan[];
}
