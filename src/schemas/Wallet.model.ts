import { Schema, model } from "mongoose";

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

export default Wallet;