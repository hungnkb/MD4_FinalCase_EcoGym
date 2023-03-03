import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Wallet } from "../schemas/Waller.model";
import axios from 'axios';

class homeController {
  showHome = async (req: Request, res: Response) => {
    let token = req.signedCookies.authorization.split(" ")[1];
    let user = jwt.verify(token, process.env.USER_CODE_SECRET);
    let id = new Object(user.sub);
    let wallets = await Wallet.find({ idUser: id });
    if (wallets.length === 0) {
      axios({
        method: 'post',
        url: '/api/wallet',
        data: {
          
        }
      });
    }

    res.render("home");
  };
}

export default new homeController();
