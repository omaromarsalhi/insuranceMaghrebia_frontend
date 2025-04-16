export interface PaymentPlan {

    month: number;
    amountDue: number;
    amountPaid: number;
    paymentStatus: PaymentStatus;
    paymentContractId: string;
    paymentDate: Date;
    dueDate: Date;
    hashBlock: string;
}
enum PaymentStatus {
    Pending,
    Paid,
    Overdue
}