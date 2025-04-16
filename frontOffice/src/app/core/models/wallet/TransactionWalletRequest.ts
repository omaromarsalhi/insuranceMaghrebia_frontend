import { TransactionType } from "./TransactionType";

export interface WalletTransactionRequest {
    walletId: String,

    amount: number,
    description: String,
    type: TransactionType,
    reward: number,
    contractCreatedAt: Date,

}