import { Request, Response } from "express";
import Transaction from "../../schemas/Transaction";
import transactionController from "../transaction.controller";
import token from "../user.controller";
class transactionApiController {
  // GET
  showTransaction = async (req: Request, res: Response) => {
    let idUser = token.getIdUser(req, res);
    let offset = 0;
    if (req.params) {
      offset = Number(req.params) * 5;
    } else {
      offset = 0;
    }

    try {
      let transactions = Transaction.find({ idUser: idUser })
        .skip(offset)
        .limit(5);
      res.status(200).json(transactions);
    } catch (err) {
      console.log(err);
    }
  };

  // POST
  postTransaction = async (req: Request, res: Response) => {
    let id = await token.getIdUser(req, res);
    let { nameWallet, moneyTrade, status, nameCategory, desc, timeTrade } = req.body;
    
    let newTransaction = await Transaction.create({
      idUser: id,
      nameWallet: nameWallet,
      moneyTrade: moneyTrade,
      status: status,
      nameCategory: nameCategory,
      desc: desc,
      timeTrade: timeTrade,
    });
    console.log(id);
    
    // update total money left in Wallet
    try {
      if (newTransaction) {
        transactionController.sumTotal(id, nameWallet, status, moneyTrade);
      }
    } catch (err) {
      console.log(err);
    }

    res.status(200).json({
      errorCode: 0,
      data: newTransaction,
    });
  };

  // PUT
  updateTransaction = async (req: Request, res: Response) => {
    let id = req.params.id;
    let { nameWallet, moneyTrade, status, nameCategory, desc, timeTrade } =
      req.body;
    const opts = { runValidators: true };
    const transUpdated = await Transaction.updateOne(
      { _id: id },
      {
        nameWallet: nameWallet,
        moneyTrade: moneyTrade,
        status: status,
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
    let id = req.params._id;
    let transaction = await Transaction.findOne({_id: id});
    console.log(transaction);
    
    // let deleteTrans = await Transaction.deleteOne({ _id: id }).exec();

    // update total money left in Wallet


res.status(200).json({message: 'oke'})
    // res.status(200).json({
    //   errorCode: 0,
    //   data: deleteTrans,
    // });
  };
}

export default new transactionApiController();
