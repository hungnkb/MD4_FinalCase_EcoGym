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
    // let from = new Date(req.params.fromDate);
    // let to = new Date(req.params.toDate);
    let period = '';
    
    let from: any = req.params.fromDate;
    let to: any = req.params.toDate;
    
    // let from = new Date().toISOString().split('T')[0];
    // let to = new Date().toISOString().split('T')[0];
    
    try {
      if (req.params.walletName == "all-wallet"){
        let transactions = await Transaction.find({ idUser: idUser, timeTrade: {$lte: from, $gte: to}})
          .skip(offset)
          .limit(5);
           
          let arrFrom = from.split("-");
          let monthFrom =  parseInt(arrFrom[1],10);
          let dateFrom = parseInt(arrFrom[2]);
          
          let arrTo = to.split("-");
          let monthTo =  parseInt(arrTo[1],10);
          let dateTo = parseInt(arrTo[2]);
          // let fromDate = new Date(from);
          // let toDate = new Date(to);
      
          if (from === to) {
            period = "today";
          } else if (monthFrom === monthTo && dateFrom === 1 && dateTo === 31){
            period = "month"
          } else {
            period = "custom"
          }
  
      res.status(200).json({transactions, total: transactions.length, period: period});
      } else {
        let walletName = req.params.walletName
        let transactions = await Transaction.find({ idUser: idUser, walletName: walletName, timeTrade: {$lte: from, $gte: to}})
          .skip(offset)
          .limit(5);
          // let fromDate = new Date(from);
          // let toDate = new Date(to);
          
          // if (fromDate == toDate) {
          //   period = "today";
          // } else if (fromDate.getMonth() == toDate.getMonth() && fromDate.getDate() == 1 && toDate.getDate() == 31){
          //   period = "month"
          // } else {
          //   period = "custom"
          // }
          
      res.status(200).json({transactions, total: transactions.length, period: period});
      }
      
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