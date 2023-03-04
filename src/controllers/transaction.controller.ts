import { Request, Response } from "express";
import jwt from "jsonwebtoken";

class transactionController {
    getIdUser = (req, res) => {
        let token = req.signedCookies.authorization.split(" ")[1];
        let user = jwt.verify(token, process.env.USER_CODE_SECRET);
        let idUser = new Object(user.sub);
        return idUser
    }
}
export default new transactionController()