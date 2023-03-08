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
    let period = "";
    

    let from = req.params.fromDate;
    let to = req.params.toDate;
   
    let dateFrom = new Date(req.params.fromDate).getDate();
    let monthTo = new Date(req.params.toDate).getMonth() + 1;
    let dateTo = new Date(req.params.toDate).getDate();
    let monthFrom = new Date(req.params.fromDate).getMonth() + 1;

    if (from === to) {

      period = "today";
    } else if (monthFrom === monthTo && dateFrom == 1 && dateTo == 31) {

      period = "month";
    } else {

      period = "custom";
    }
    // let fromStr = new Date().toISOString().split("T")[0];
    // let toStr = new Date().toISOString().split("T")[0];

    try {
      if (req.params.walletName == "all-wallet") {
        let transactions = await Transaction.find({
          idUser: idUser,
          timeTrade: { $gte: from, $lte: to },
        })
          .skip(offset)
          .limit(5);

       

        let transactionsTotal = await Transaction.find({
          idUser: idUser,
          timeTrade: {
            $gte: from,
            $lte: to,
          },
        });

        res
          .status(200)
          .json({
            transactions,
            total: transactionsTotal.length,
            transactionAll: transactionsTotal,
            period: period,
          });
      } else {
        console.log(req.params.walletName, period);
        
        let walletName = req.params.walletName;
        let transactions = await Transaction.find({
          idUser: idUser,
          nameWallet: walletName,
          timeTrade: { $gte: from, $lte: to },
        })
          .skip(offset)
          .limit(5);
        
          let transactionsTotal = await Transaction.find({
            idUser: idUser,
            walletName: walletName,
            timeTrade: {
              $gte: from,
              $lte: to,
            },
          });
          console.log(transactions);
          
          res.status(200).json({
            transactions,
            total: transactionsTotal.length,
            transactionAll: transactionsTotal,
            period: period,
          })
        // let fromDate = new Date(from);
        // let toDate = new Date(to);

        // if (fromDate == toDate) {
        //   period = "today";
        // } else if (fromDate.getMonth() == toDate.getMonth() && fromDate.getDate() == 1 && toDate.getDate() == 31){
        //   period = "month"
        // } else {
        //   period = "custom"
        // }
        // console.log(1, transactions);

        // let transactionsTotal = await Transaction.find({
        //   idUser: idUser,
        //   walletName: walletName,
        //   timeTrade: { $gte: from, $lte: to },
        // });
        // res
        //   .status(200)
        //   .json({
        //     transactions: transactions,
        //     total: transactionsTotal.length,
        //     period: period,
        //   });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // POST
  postTransaction = async (req: Request, res: Response) => {
    let id = await token.getIdUser(req, res);

    let { nameWallet, moneyTrade, status, nameCategory, desc, timeTrade } =
      req.body;

    let newTransaction = await Transaction.create({
      idUser: id,
      nameWallet: nameWallet,
      moneyTrade: moneyTrade,
      status: status,
      nameCategory: nameCategory,
      desc: desc,
      timeTrade: timeTrade,
    });
    // update total money left in Wallet
    try {
      if (newTransaction) {
        transactionController.sumTotal(
          id,
          nameWallet,
          status,
          0,
          moneyTrade,
          "add"
        );
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
    let id = token.getIdUser(req, res);

    try {
      let {
        _id,
        nameWallet,
        moneyTrade,
        status,
        nameCategory,
        desc,
        timeTrade,
        currentMoney,
      } = req.body;

      let updateTransaction = await Transaction.findByIdAndUpdate(
        { _id: _id },
        {
          $set: {
            nameWallet: nameWallet,
            moneyTrade: moneyTrade,
            status: status,
            nameCategory: nameCategory,
            desc: desc,
            timeTrade: timeTrade,
          },
        }
      );

      if (updateTransaction) {
        transactionController.sumTotal(
          id,
          nameWallet,
          status,
          currentMoney,
          moneyTrade,
          "update"
        );
        res.status(200).json({ message: "Update success" });
      } else {
        res.status(400).json({ message: "Update fail" });
      }
    } catch (error) {
      console.log(error);
    }

    // const opts = { runValidators: true };
    // const transUpdated = await Transaction.updateOne(
    //   { _id: id },
    //   {
    //     nameWallet: nameWallet,
    //     moneyTrade: moneyTrade,
    //     status: status,
    //     nameCategory: nameCategory,
    //     desc: desc,
    //     timeTrade: timeTrade,
    //   },
    //   opts
    // );
    // res.status(200).json({
    //   errorCode: 0,
    //   data: transUpdated,
    // });
  };

  // DELETE
  deleteTransaction = async (req: Request, res: Response) => {
    let idUser = token.getIdUser(req, res);
    let id = req.params._id;
    let currentMoney = req.params.moneyTrade;
    let status = req.params.status;
    let nameWallet = req.params.nameWallet;

    let deleteUser = await Transaction.findOneAndDelete({ _id: id })
      .then((result) => {
        transactionController.sumTotal(
          idUser,
          nameWallet,
          status,
          0,
          Number(currentMoney),
          "remove"
        );

        res.status(200).json({ message: "Delete transaction success" });
      })
      .catch((err) => {
        res.status(400).json({ message: "Delete transaction fail" });
      });
    // let transaction = await Transaction.findOne({ _id: id });
    // let deleteTransaction = await Transaction.findOneAndDelete({_id: id})
    // update total money left in Wallet

    // res.status(200).json({
    //   errorCode: 0,
    //   data: deleteTrans,
    // });
  };
}

export default new transactionApiController();
