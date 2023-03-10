import { Request, Response } from "express";
import passport from "passport";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import User from "../schemas/User.model";
import token from "../controllers/user.controller";

class authController {
  showLogin = async (req: Request, res: Response) => {
    res.render("login");
  };

  showRegister = async (req: Request, res: Response) => {
    res.render("register");
  };

  loginOverGoogle = async (req: Request, res: Response) => {
    let id = req["user"].id;
    let user = await User.findOne({ _id: id });
    let token = jwt.sign(
      {
        iss: "Book Store",
        sub: id,
        iat: new Date().getTime(),
      },
      process.env.USER_CODE_SECRET,
      { expiresIn: 604800000 }
    );
    res.cookie("authorization", "Bearer " + token, { signed: true });
    res.redirect("/");
  };

  showProfile = async (req: Request, res: Response) => {
    let id = token.getIdUser(req, res);
    let userInfo = await User.findById({_id: id });
    console.log(userInfo);
    
    res.render("profile", {userInfo});
  };
}

export default new authController();
