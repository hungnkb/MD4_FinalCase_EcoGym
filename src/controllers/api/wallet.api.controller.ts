import { Request, Response } from "express";
import Wallet from "../../schemas/Wallet.model";
import Category from "../../schemas/Category.model";
import token from "../user.controller";

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

      let saveWallet = await newWallet.save();

      if (saveWallet) {
        res
            .status(200)
            .json({ message: "Create wallet success", data: saveWallet });
      } else {
        res.status(400).json("Wallet name is exist, please try again");
      }
    }
  };

  getWalletInfo = async (req: Request, res: Response) => {
    try {
      let id = token.getIdUser(req, res);
      let wallets = await Wallet.find({idUser: id})
      if (wallets) {
        res.status(200).json({wallets: wallets});
      } else {
        res.status(400).json({error: 1});
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new walletApiController();
