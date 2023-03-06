import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../schemas/User.model";
import passport from "passport";
import jwt from "jsonwebtoken";
import validateRegister from "../middleware/validateRegister";
import qs from "qs";
import Wallet from '../schemas/Wallet.model'

class apiController {
  register = async (req: Request, res: Response): Promise<any> => {
    try {
      let { email, password } = req.body;
      let validateResult = validateRegister.check(email, password);

      if (validateResult === "bothValid") {
        let isEmailExist = await User.findOne({ email: email });
        if (isEmailExist) {
          res.status(400).json({ message: "Register fail" });
        } else {
          const salt = await bcrypt.genSaltSync(10);
          password = await bcrypt.hashSync(password, salt);

          // let newUser = new User({ email, password });
          // await newUser.save();
          let newUser = await User.create({ email, password });
          res.status(200).json({ message: "Register success", data: newUser });
        }
      } else {
        res.status(400).json({ message: validateResult });
      }
    } catch (error) {
      console.log(error);
    }
  };

  login = async (req: Request, res: Response) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign(
              {
                iss: "Book Store",
                sub: user.id,
                iat: new Date().getTime(),
              },
              process.env.USER_CODE_SECRET,
              { expiresIn: 604800000 }
          );
          res.cookie("authorization", "Bearer " + token, { signed: true });
          res.status(200).json({ message: "Login success", user, token });
        } else {
          res.status(400).json({ message: "Wrong password, please try again" });
        }
      });

      res.status(400).json({ message: "Email is not exist, please try again" });
    }
  };

  logout = async (req: Request, res: Response) => {
    let cookieObj = qs.parse(req.headers.cookie);
    let name = Object.keys(cookieObj)[0];
    res.clearCookie(name).status(200).json({ message: "logout success" });
  };

  createWallet = async (req: Request, res: Response) => {
    let { idUser, walletName, icon, totalMoneyLeft } = req.body;
    let wallet = await Wallet.find({ walletName: walletName });
    if (wallet) {
      res.status(400).json("Wallet name is exist, please try again");
    } else {
    }
  };
}

export default new apiController();