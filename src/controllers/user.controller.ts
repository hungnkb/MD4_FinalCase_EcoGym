import jwt from "jsonwebtoken";
import { Request, Response } from "express";

class token {
  getIdUser = (req: Request, res: Response) => {
    try {
      let token = req.signedCookies.authorization.split(" ")[1];
      let user = jwt.verify(token, process.env.USER_CODE_SECRET);
      let id = user.sub;
      return id;
    } catch (err) {
      console.log(err);
    }
  };
}

export default new token();
