import authApiController from "../controllers/api/auth.api.controller";
import express from "express";
import walletApiController from "../controllers/api/wallet.api.controller";
import transactionApiController from "../controllers/api/transaction.api.controller";
import transactionRouter from "./transaction.router";

const apiRouter = express.Router();

// apiRouter.get('/login', apiController.showLogin);
apiRouter.post("/register", authApiController.register);
apiRouter.post("/login", authApiController.login);
apiRouter.get("/logout", authApiController.logout);

apiRouter.post("/wallet", walletApiController.createWallet);

apiRouter.post("/category", walletApiController.createNewCategory);
apiRouter.get("/user/:idUser", authApiController.getDataUser);

apiRouter.get("/transaction", transactionRouter)

export default apiRouter;
