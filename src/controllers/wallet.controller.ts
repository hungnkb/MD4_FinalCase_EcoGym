import express from "express";
import Wallet from "../schemas/Wallet.model";
import token from "./user.controller"
import User from "../schemas/User.model";

class walletController {
  createWalletDefault = async (id: string): Promise<void> => {
    let idUser = id;
    let walletName = "Default Wallet";
    let totalMoney = 0;
    await Wallet.create({idUser, walletName, totalMoneyLeft: totalMoney})
  };
  showWalletByUser = async (req, res): Promise<void> => {
    let id = token.getIdUser(req, res);
    let idUser = id;
    let userInfo = await User.find({_id: id})
    let listWallet = await Wallet.find({idUser:id});
    res.render("walletManager", {wallets:listWallet, userInfo: userInfo, idUser: idUser})
  }
}

export default new walletController();
