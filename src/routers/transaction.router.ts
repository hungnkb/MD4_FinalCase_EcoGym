import express from 'express';
import transactionApiController from '../controllers/api/transaction.api.controller';
import transactionController from '../controllers/transaction.controller';

const transactionRouter = express.Router();
transactionRouter.get("/create", transactionApiController.getTransaction)
transactionRouter.post("/create", transactionApiController.postTransaction)
// transactionRouter.get("/update/:id", transactionController.getUpdate)
// transactionRouter.put("/update/", transactionApiController.updateTransaction)
// transactionRouter.get("/delete/:id", transactionController.getDelete)
// transactionRouter.delete("/delete/", transactionApiController.deleteTransaction)
transactionRouter.get("/get-list-trans", transactionController.getListTrans)
export default transactionRouter;