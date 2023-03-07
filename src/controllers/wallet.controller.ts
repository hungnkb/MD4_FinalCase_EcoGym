import express from "express";
import Wallet from "../schemas/Wallet.model";
import token from "./user.controller"

class walletController {
  createWalletDefault = async (id: string): Promise<void> => {
    let idUser = id;
    let walletName = "Default Wallet";
    let totalMoney = 0;
    let newWallet = await Wallet.create({idUser, walletName, totalMoneyLeft: totalMoney})
  };
}

export default new walletController();
