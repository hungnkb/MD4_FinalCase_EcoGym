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
    console.log("listTrans: ", listTrans);
    
    const userDataAll = await User.find({ _id: id });
    console.log("userDataAll: ",userDataAll);
    
    
    // get category default from db
      const defaultCategory = await Category.find({ idUser: null});
      console.log("defaultCategory: ",defaultCategory);
      
    // if User has no wallet => create new wallet default
    if (wallets.length === 0) { 
      walletController.createWalletDefault(req, res, id);
    } 
    res.render("home", {userDataAll, wallets, listTrans, categories: defaultCategory})
  };
  
}

export default new homeController();
