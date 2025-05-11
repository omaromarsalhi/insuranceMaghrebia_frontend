import { TransactionType } from "./TransactionType";


export interface WalletRequest {

    userId: String,

    currency: String,

    fullName: String,

    source: TransactionType

}