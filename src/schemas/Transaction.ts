import { Schema, model } from "mongoose";

interface ITransaction {
    idUser: string,
    nameWallet: string,
    moneyTrade: number,
    status: string,
    nameCategory: string,
    desc: string,
    timeTrade: Date,
}

const transactionSchema = new Schema<ITransaction>({
    idUser: String,
    nameWallet: String,
    moneyTrade: Number,
    status: String,
    nameCategory: String,
    desc: String,
    timeTrade: Date
})

const Transaction = model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
