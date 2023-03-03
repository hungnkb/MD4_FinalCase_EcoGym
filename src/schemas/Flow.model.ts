import { Schema, model } from "mongoose";

interface IFlow {
    idUser: String,
    moneyTrade: Number,
    nameCategory: String,
    desc: String,
    timeTrade: Date
}


const flowSchema = new Schema<IFlow>({
    idUser: String,
    moneyTrade: Number,
    nameCategory: String,
    desc: String,
    timeTrade: Date
})

const Flow = model<IFlow>('Wallet', flowSchema);

export {Flow};