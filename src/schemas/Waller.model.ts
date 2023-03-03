import { Schema, model } from "mongoose";

interface IWallet {
    idUser: String,
    walletName: String,
    icon: String,
    totalMoneyLeft: Number
}


const walletSchema = new Schema<IWallet>({
    idUser: String,
    walletName: String,
    icon: String,
    totalMoneyLeft: Number
})

const Wallet = model<IWallet>('Wallet', walletSchema);

export {Wallet};