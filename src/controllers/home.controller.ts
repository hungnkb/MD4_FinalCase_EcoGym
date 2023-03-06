import { Request, Response } from "express";
import Wallet from "../schemas/Wallet.model";
import token from "./user.controller";
import Transaction from "../schemas/Transaction";
import User from "../schemas/User.model";
import Category from './../schemas/Category.model';
import walletController from "./wallet.controller";
class homeController {
  showHome = async (req: Request, res: Response) => {
    let id = token.getIdUser(req, res);
    // check User has wallet or not
    let wallets = await Wallet.find({ idUser: id });
    const listTrans = await Transaction.find({ idUser: id});
    const userInfo = await User.find({ _id: id });
    const category = await Category.find({ idUser: id });
    // get category default from db
    const defaultCategory = await Category.find({ idUser: "null"});

    // if User has no wallet => create new wallet default
    if (wallets.length === 0) {
      walletController.createWalletDefault(req, res, id);
    }
    let totalMoney = 0;
    wallets.forEach(wallet => {
      totalMoney += wallet.totalMoneyLeft
    })
    res.render("home", {userInfo, wallets, listTrans, defaultCategory, category,totalMoney })
  };

}

export default new homeController();