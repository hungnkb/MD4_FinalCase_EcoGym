import { Request, Response } from "express";
import Transaction from "../../schemas/Transaction";
import transactionController from "../transaction.controller";
import token from "../user.controller";
class transactionApiController {
  // GET
  showTransaction = async (req: Request, res: Response) => {
    let idUser = token.getIdUser(req, res);    
    let offset = 0;
    if (req.params.offset) {
      offset = Number(req.params.offset) * 5;
    }    

    try {
      let totalTransactions = await Transaction.find({idUser: idUser, timeTrade: req.params.period});
      let total = totalTransactions.length;
      let transactions = await Transaction.find({ idUser: idUser, timeTrade: req.params.period})
          .skip(offset)
          .limit(5);
      res.status(200).json({transactions, total});
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
    console.log(nameWallet, moneyTrade, status, nameCategory, desc, timeTrade);
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