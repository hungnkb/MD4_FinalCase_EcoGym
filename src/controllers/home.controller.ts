import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Wallet from "../schemas/Wallet.model";
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

    let wallets = await Wallet.find({ idUser: id });
    // create new Category package for new User
    try {
      await categoryApiController.createCategoryPackage(req, res);
    } catch (error) {
      console.log(error);
    }
    // if User has no wallet => create new wallet default
    let listTrans = await axios({
      method: "get",
      url: `http://localhost:${process.env.PORT}/transaction/get-list-trans`,
    });

    let userDataAll = await axios({
      method: "get",
      url: `http://localhost:${process.env.PORT}/api/user/${id}`,
    });

    // get all User's data: userDataAll.data
    // example: get all categories -> userDataAll.data.categories[0].categoryList
    let categories = userDataAll.data.categories[0].categoryList;
    console.log(wallets);

    if (wallets.length === 0) {
      let firstWallet = await axios({
        method: "post",
        url: `http://localhost:${process.env.PORT}/api/wallet`,
        data: {
          idUser: id,
          walletName: "1st Wallet",
          icon: 1,
          totalMoneyLeft: 0,
        },
      });
      let listTrans = await axios({
        method: "get",
        url: `http://localhost:${process.env.PORT}/transaction/get-list-trans`,
      });
      wallets = await Wallet.find({ idUser: id });
      res.render("home", {
        wallets: wallets,
        listTrans: listTrans.data,
        categories,
      });
    } else {
      res.render("home", { wallets, listTrans: listTrans.data, categories });
    }
  };
}

export default new homeController();
