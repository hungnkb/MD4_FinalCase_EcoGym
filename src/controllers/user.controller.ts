import jwt from "jsonwebtoken";
import { Request, Response } from "express";

class token {
  getIdUser = (req: Request, res: Response): Object => {
    let token = req.signedCookies.authorization.split(" ")[1];
    let user = jwt.verify(token, process.env.USER_CODE_SECRET);
    let id = new Object(user.sub);
    return id;
  };
}

export default new token();
