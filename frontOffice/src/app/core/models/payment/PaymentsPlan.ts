export interface PaymentPlan {

    paymentPlanId?: string;
    amountDue: number;
    amountPaid: number;
    paymentStatus: string;
    dueDate: Date;
    paymentDate: Date;
}