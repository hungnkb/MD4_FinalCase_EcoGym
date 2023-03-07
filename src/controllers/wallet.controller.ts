import express from "express";
import Wallet from "../schemas/Wallet.model";
import token from "./user.controller"

class walletController {
    createWalletDefault = async(req, res, id) => {
        let isUser = id
        let walletName = "Default Wallet";
        let totalMoney = 0
        try {
            await Wallet.create({isUser, walletName, totalMoney});
            console.log("successfully created");
        } catch (error) {
            console.log(error);
        }
    }
}

export default new walletController();
