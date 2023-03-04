import jwt from "jsonwebtoken";
import { Request, Response } from "express";

class token {
  getIdUser = (req: Request, res: Response): Object => {
    try {
      let token = req.signedCookies.authorization.split(" ")[1];
      let user = jwt.verify(token, process.env.USER_CODE_SECRET);
      let id = user.sub;
      return id;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new token();
