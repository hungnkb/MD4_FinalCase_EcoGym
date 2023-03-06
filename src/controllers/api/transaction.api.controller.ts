import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Transaction from "../../schemas/Transaction";
import token from "../user.controller"
class transactionApiController{
    // GET
    showCreateTransaction = async(req: Request, res:Response) => {
        let id = await token.getIdUser(req, res);
        const allTransaction = await Transaction.find({idUser: id});
        if (allTransaction.length === 0) {
            res.send("You don't have a trade yet")
        }
        res.status(200).json({
            errorCode: 0,
            data: allTransaction
        })
    }
    // POST
    createTransaction = async (req: Request, res:Response) => {
        let id = await token.getIdUser(req, res);
        let {nameWaller, moneyTrade, nameCategory, desc, timeTrade} = req.body;
        let newTransaction = await Transaction.create({idUser: id, nameWaller: nameWaller, moneyTrade: moneyTrade, nameCategory: nameCategory, desc: desc, timeTrade: timeTrade})
        res.status(200).json({
            errorCode: 0,
            data: newTransaction
        })
    }
    // PUT
    updateTransaction = async (req: Request, res:Response) => {
        let id = await token.getIdUser(req, res);
        let {nameWaller, moneyTrade, nameCategory, desc, timeTrade} = req.body;
        const opts = { runValidators: true };
        const transUpdated = await Transaction.updateOne(
            {idUser: id}, 
            {nameWaller: nameWaller, moneyTrade: moneyTrade, nameCategory: nameCategory,desc: desc, timeTrade: timeTrade}, 
            opts);
        res.status(200).json({
            errorCode: 0,
            data: transUpdated
        })
    }
    // DELETE
    deleteTransaction = async (req: Request, res:Response) => {
        let idTrans = req.body.idTrans;
        let deleteTrans = await Transaction.deleteOne({_id: idTrans}).exec();
        res.status(200).json({
            errorCode: 0,
            data: deleteTrans
        })
    }
}

export default new transactionApiController();