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
          res.send({ wallet });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // test get list trans
    let listTrans;
     axios({
      method: "get",
      url: `http://localhost:${process.env.PORT}/transaction/get-list-trans`,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
      .then(result => {
        listTrans = result.data;
        // console.log(listTrans);
        return  res.send({listTrans})
      })
      .catch((error) => {
        console.log(error);
      });
    res.render("home", {wallets: wallets, listTrans: listTrans});
  };
  
}

export default new homeController();
