import express from 'express';
import transactionApiController from '../controllers/api/transaction.api.controller';
import transactionController from '../controllers/transaction.controller';

const transactionRouter = express.Router();
// transactionRouter.get("/create", transactionController.getTransaction)
transactionRouter.post("/create", transactionApiController.postTransaction)
// transactionRouter.get("/update/:id", transactionController.getUpdate)
// transactionRouter.put("/update/", transactionApiController.updateTransaction)
// transactionRouter.get("/delete/:id", transactionController.getDelete)


export default transactionRouter;