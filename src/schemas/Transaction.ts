import { Schema, model } from "mongoose";

interface ITransaction {
    idUser: string,
    nameWallet: string,
    moneyTrade: number,
    nameCategory: string,
    desc: string,
    timeTrade: Date,
}


const transactionSchema = new Schema<ITransaction>({
    idUser: String,
    nameWallet: String,
    moneyTrade: Number,
    nameCategory: String,
    desc: String,
    timeTrade: Date
})

const Transaction = model<ITransaction>('Transaction', transactionSchema);

export default Transaction;