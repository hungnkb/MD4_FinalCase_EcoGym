import { ObjectId } from "bson";
import { Request, Response, NextFunction } from "express";
import { User } from "../schemas/User.model";
import jwt from "jsonwebtoken";

class Authorize {
  admin = (req: Request, res: Response, next: NextFunction): void => {
    let role = req.body.role;
    if (role === 1) {
      next();
    } else {
      res.redirect("/");
    }
  };

  user = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
     if (req.signedCookies.authorization == undefined) {
        res.redirect("/auth/login");
     } else {
        let token = req.signedCookies.authorization.split(" ")[1];
        let user = jwt.verify(token, process.env.USER_CODE_SECRET);
        // let user = JSON.parse(
        //   Buffer.from(token.split(".")[1], "base64").toString()
        // );
        let dateNow = Date.now();
        if (user.exp <= dateNow) {
          res.redirect("/auth/login");
        } else {
          let id = new Object(user.sub);
  
          let userData = await User.findOne({ _id: id });
          let role = Number(userData.role);
  
          if (role === 2 || role === 1 || req.signedCookies.authorization === undefined) {
            next();
          } else {
            res.redirect("/");
          }
        }
     }
    
    
  };

  guest = (req: Request, res: Response, next: NextFunction): void => {
    let role = req.body.role;
    if (role !== 2 && role !== 1) {
      next();
    } else {
      res.redirect("/");
    }
  };
}

export default new Authorize();
