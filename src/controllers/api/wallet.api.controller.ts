import { Request, Response } from "express";
import Wallet from "../../schemas/Waller.model";
import Category from "../../schemas/Category.model";
import token from "../user.controller"

class walletApiController {
  createWallet = async (req: Request, res: Response) => {
    let id = token.getIdUser(req, res);
    let idUser = req.body.idUser || id;
    let walletName: string = req.body.walletName;
    let icon: number = req.body.icon;
    let totalMoneyLeft: number = req.body.totalMoneyLeft;
    let wallet = await Wallet.findOne({
      walletName: walletName,
      idUser: idUser,
    });

    if (wallet) {
      res.status(400).json("Wallet name is exist, please try again");
    } else {
      let newWallet = new Wallet({ idUser, walletName, icon, totalMoneyLeft });
      console.log(newWallet);

      let saveWallet = await newWallet.save();
      if (saveWallet) {
        res.status(200).json("Create wallet success");
      } else {
        res.status(400).json("Wallet name is exist, please try again");
      }
    }
  };

  createCategoryPackage = async (req: Request, res: Response) => {
    // Create default Categories for new User

  }

  createNewCategory = async (req: Request, res: Response) => {

    // User create new Category by themselves
    let id = token.getIdUser(req, res);
    let idUser = req.body.idUser || id;
    let categoryName = req.body.categoryName;
    let categoryDescription = req.body.categoryDescription;

    let category = { idUser: idUser, categoryName: categoryName };
    let isCategoryExist = await Category.findOne({
      idUser: idUser,
      categoryName: categoryName,
      description: categoryDescription,
    });
    if (isCategoryExist) {
      res
        .status(400)
        .json({ message: "This category is exist, please try again" });
    } else {
      let newCategory = new Category(category);
      let doneCategory = await newCategory.save();
      if (doneCategory) {
        res.status(200).json({ message: "Create category success" });
      } else {
        res.status(400).json({ message: "Create category fail" });
      }
    }
  };

  showCategoryByUser = async (req: Request, res: Response) => {
    let id = token.getIdUser(req, res);
    let idUser = req.body.idUser || id;
    try {
      await Category.find({ idUser: idUser })
        .then((data) => {
          res.status(200).json({ categoryList: data });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

}

export default new walletApiController();
