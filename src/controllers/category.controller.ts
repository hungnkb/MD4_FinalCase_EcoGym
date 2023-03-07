import { Request, Response } from "express";
import token from "./user.controller";
import Category from "./../schemas/Category.model";
import Wallet from "../schemas/Wallet.model";
import User from "../schemas/User.model";
 class categoryController {
    showCategoryByUser = async (req: Request, res: Response) => {
        // get id user
        let id = token.getIdUser(req, res);
        let wallets = await Wallet.find({idUser: id})
        let totalMoney = 0;
        wallets.forEach((wallet) => {
            totalMoney += wallet.totalMoneyLeft;
        });
        // let idUser = req.body.idUser || req.params.idUser || id ;
        // get default category
        let listDefault = await Category.find({idUser: "null"});
        let listDefaultName = [];
        listDefault.forEach( category => {
          listDefaultName.push(category);
        })
        let userCategory = await Category.find({idUser: id});
        let listUserCategory = []
        userCategory.forEach( category => {
          listUserCategory.unshift(category);
        })
        const userInfo = await User.find({ _id: id });
        let listCategory = []
        listUserCategory.forEach(category => {
          for (let i = 0; i < listDefaultName.length; i++) {
            if (category.categoryName === listDefaultName[i]) {
              listDefaultName.splice(i, 1);
            }
          }
        })
        listCategory = [...listUserCategory,...listDefaultName]
        res.render('categoryManager', {listCategory, wallets,totalMoney,idUser: id, userInfo })
      };

 }
 export default new categoryController();