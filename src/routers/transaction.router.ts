import express from 'express';
import transactionApiController from '../controllers/api/transaction.api.controller';
const transactionRouter = express.Router();

transactionRouter.post("/create", transactionApiController.createTransaction)
transactionRouter.put("/update/:id", transactionApiController.createTransaction)
export default transactionRouter;