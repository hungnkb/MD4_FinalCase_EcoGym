import express from "express";
import { Request, Response } from "express";
import token from "./user.controller";
import Transaction from "../schemas/Transaction";

class transactionController {
  // getUpdate = async(req:Request, res: Response) => {
  //     res.render("update-trans")
  // }
  // getDelete = async(req:Request, res: Response) => {
  //     res.render("delete-trans")
  // }
  getListTrans = async (req: Request, res: Response, id) => {
    let listTrans = await Transaction.find({ idUser: id });
    if (listTrans.length > 0) {
      res.send({ listTrans });
    } else {
      res.send("Bạn chưa có giao dịch nào");
    }
  };
}
export default new transactionController();
