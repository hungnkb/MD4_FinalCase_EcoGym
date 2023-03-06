import { Request, Response } from "express";
import Transaction from "../../schemas/Transaction";
import token from "../user.controller";
class transactionApiController {
  // GET
  getTransaction = async (req: Request, res: Response) => {
    res.render("createTransaction");
  };
  // POST
  postTransaction = async (req: Request, res: Response) => {
    let id = await token.getIdUser(req, res);
    let { nameWaller, moneyTrade, nameCategory, desc, timeTrade } = req.body;
    let newTransaction = await Transaction.create({
      idUser: id,
      nameWaller: nameWaller,
      moneyTrade: moneyTrade,
      nameCategory: nameCategory,
      desc: desc,
      timeTrade: timeTrade,
    });
    res.status(200).json({
      errorCode: 0,
      data: newTransaction,
    });
  };
  // PUT
  updateTransaction = async (req: Request, res: Response) => {
    let id = req.params.id;
    let { nameWaller, moneyTrade, nameCategory, desc, timeTrade } = req.body;
    const opts = { runValidators: true };
    const transUpdated = await Transaction.updateOne(
      { _id: id },
      {
        nameWaller: nameWaller,
        moneyTrade: moneyTrade,
        nameCategory: nameCategory,
        desc: desc,
        timeTrade: timeTrade,
      },
      opts
    );
    res.status(200).json({
      errorCode: 0,
      data: transUpdated,
    });
  };
  // DELETE
  deleteTransaction = async (req: Request, res: Response) => {
    let id = req.params.id;
    let deleteTrans = await Transaction.deleteOne({ _id: id }).exec();
    res.status(200).json({
      errorCode: 0,
      data: deleteTrans,
    });
  };
}

export default new transactionApiController();
