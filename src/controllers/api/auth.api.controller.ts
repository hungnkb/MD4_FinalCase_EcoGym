import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../schemas/User.model";
import jwt from "jsonwebtoken";
import validateRegister from "../../middleware/validateRegister";
import qs from "qs";
import Wallet from "../../schemas/Wallet.model";
import Category from "../../schemas/Category.model";
import token from "../user.controller";

class authApiController {
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

    try {
      let user = await User.findOne({ email: email });
      if (user != null) {
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
            res
              .status(400)
              .json({ message: "Wrong password, please try again" });
          }
        });
      } else {
        res
          .status(400)
          .json({ message: "Email is not exist, please try again" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  logout = async (req: Request, res: Response) => {
    let cookieObj = qs.parse(req.headers.cookie);
    let name = Object.keys(cookieObj)[0];
    res.clearCookie(name).status(200).json({ message: "logout success" });
  };

  getDataUser = async (req: Request, res: Response) => {
    // Get all Info + Wallets + Categories + Flows of User by idUser which is get from params
    // URL: http://localhost:3000/api/user/<idUser>

    let idUser = req.params.idUser || token.getIdUser(req, res);

    try {
      let wallets = await Wallet.find({ idUser: idUser });
      let categories = await Category.find({ idUser: idUser });
      let info = await User.find({ idUser: idUser });
      if (wallets && categories) {
        res.status(200).json({ info, wallets, categories });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Fail" });
    }
  };

  changePassword = async (req: Request, res: Response) => {
    let id = token.getIdUser(req, res);
    let newPassword = req.body.newPassword;
    let currentPassword = req.body.currentPassword;
    let user = await User.findById({ _id: id });
    if (user != null) {
      
      bcrypt.compare(currentPassword, user.password, async (err, result) => {
        if (result) {       
          const salt = await bcrypt.genSaltSync(10);
          newPassword = await bcrypt.hashSync(newPassword, salt);
          
          let updateUser = await User.findOneAndUpdate({_id: id}, {$set: {password: newPassword}});
                    
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
          res.status(200).json({ message: "Change password success", user, token });
        } else {
          res.status(400).json({ message: "Current password is wrong, please try again" });
        }
      });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    let id = token.getIdUser(req, res);
    let {name, phoneNumber, address} = req.body;
    let updateUser = await User.findOneAndUpdate({_id: id}, {$set: {name: name, phoneNumber: phoneNumber, address: address}});
    res.status(200).json({message: 'update success', data: updateUser});
  }
}

export default new authApiController();
