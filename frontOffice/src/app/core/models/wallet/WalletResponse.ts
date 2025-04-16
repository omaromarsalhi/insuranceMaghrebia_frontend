import { WalletTransactionRequest } from "./TransactionWalletRequest";
import { TransactionType } from "./TransactionType";


export interface WalletResponse {
    // walletId: String,

    userId: String,

    balance: number,

    currency: String,

    fullName: String,

    rewardsBalance: number,

    source: TransactionType,

    transactions: WalletTransactionRequest[];

}