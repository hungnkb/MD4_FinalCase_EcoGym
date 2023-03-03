import { Schema, model, ObjectId, Types } from "mongoose";
import User from "./User.model";

interface IWallet {
    idUser: string,
    walletName: string,
    icon: string,
    totalMoneyLeft: number,
}


const walletSchema = new Schema<IWallet>({
    idUser: String, 
    walletName: String,
    icon: String,
    totalMoneyLeft: Number,
})

const Wallet = model<IWallet>('Wallet', walletSchema);

export {Wallet};