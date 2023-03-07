import express from "express";
import Wallet from "../schemas/Wallet.model";

class walletController {
  createWalletDefault = async (id: string): Promise<void> => {
    let idUser = id;
    let walletName = "Default Wallet";
    let totalMoney = 0;
    let newWallet = Wallet.create({idUser, walletName, totalMoneyLeft: totalMoney})
  };
}

export default new walletController();
