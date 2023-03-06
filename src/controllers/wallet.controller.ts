import express from "express";
import Wallet from "../schemas/Wallet.model";

class walletController {
    createWalletDefault = async(req, res, id): Promise<void> => {
        let isUser = id;
        let walletName = "Default Wallet";
        let totalMoney = 0
        await Wallet.create({isUser, walletName, totalMoney});
    }
}

export default new walletController();
