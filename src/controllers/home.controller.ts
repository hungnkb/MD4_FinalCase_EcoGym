import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Wallet from "../schemas/Waller.model";
import axios from "axios";
import walletApiController from "./api/wallet.api.controller";
import token from "./user.controller";
import categoryApiController from "./api/category.api.controller";

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

    if (wallets.length === 0) {
      console.log(111);
      
      let firstWallet = await axios({
        method: "post",
        url: `http://localhost:${process.env.PORT}/api/wallet`,
        data: {
          idUser: id,
          walletName: "1st Wallet",
          icon: 1,
          totalMoneyLeft: 0,
        },
      })
      console.log(firstWallet);
      
    }
    let listTrans = await axios({
      method: "get",
      url: `http://localhost:${process.env.PORT}/transaction/get-list-trans`,
    })

    res.render('home', {wallets, listTrans: listTrans.data})

  };
  
}

export default new homeController();
