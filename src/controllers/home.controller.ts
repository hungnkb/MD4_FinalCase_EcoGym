import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Wallet from "../schemas/Waller.model";
import axios from "axios";

class homeController {
  showHome = async (req: Request, res: Response) => {
    // check User has wallet or not
    let token = req.signedCookies.authorization.split(" ")[1];
    let user = jwt.verify(token, process.env.USER_CODE_SECRET);
    let id = new Object(user.sub);
    let wallets = await Wallet.find({ idUser: id });

    // if User has no wallet => create new wallet default
    if (wallets.length === 0) {
      axios({
        method: "post",
        url: "/api/wallet",
        data: {
          idUser: id,
          walletName: "1st Wallet",
          icon: 1,
          totalMoneyLeft: 0,
        },
      })
        .then(wallet => {
          res.send({wallet});
        })
        .catch(error => {
          console.log(error);
        });
    }

    res.render("home");
  };
}

export default new homeController();
