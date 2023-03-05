import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Wallet from "../schemas/Waller.model";
import axios from "axios";
import walletApiController from "./api/wallet.api.controller";
import token from "./user.controller";
import categoryApiController from "./api/category.api.controller";
import transactionController from "./transaction.controller";
import Transaction from "../schemas/Transaction";
class homeController {
  showHome = async (req: Request, res: Response) => {
    // check User has wallet or not
    let id = token.getIdUser(req, res);
    let listTrans = await Transaction.find({idUser: id});
    let wallets = await Wallet.find({ idUser: id });
    // create new Category package for new User
    try {
      await categoryApiController.createCategoryPackage(req, res);
    } catch (error) {
      console.log(error);
    }
    // if User has no wallet => create new wallet default
    if (wallets.length === 0) {
      axios({
        method: "post",
        url: `http://localhost:${process.env.PORT}/api/wallet`,
        data: {
          idUser: id,
          walletName: "1st Wallet",
          icon: 1,
          totalMoneyLeft: 0,
        },
      })
        .then((wallet) => {
          return { wallet };
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (listTrans.length === 0) {
      let mess = "Bạn chưa có giao dịch";
      res.render("home", {wallets: wallets, mess, listTrans: "abc"});
    } else {
      res.render("home", {wallets: wallets, listTrans: listTrans});
    }
  };
  
}

export default new homeController();
