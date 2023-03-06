import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Wallet from "../schemas/Wallet.model";
import axios from "axios";
import walletApiController from "./api/wallet.api.controller";
import token from "./user.controller";
import categoryApiController from "./api/category.api.controller";
import transactionController from "./transaction.controller";
import Transaction from "../schemas/Transaction";
import User from "../schemas/User.model";
import Category from "./../schemas/Category.model";
class homeController {
  showHome = async (req: Request, res: Response) => {};
}

export default new homeController();
