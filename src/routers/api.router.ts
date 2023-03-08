import authApiController from "../controllers/api/auth.api.controller";
import express from "express";
import walletApiController from "../controllers/api/wallet.api.controller";
import categoryApiController from "../controllers/api/category.api.controller";
import transactionApiController from "../controllers/api/transaction.api.controller";


const apiRouter = express.Router();

// apiRouter.get('/login', apiController.showLogin);
apiRouter.post("/register", authApiController.register);
apiRouter.post("/login", authApiController.login);
apiRouter.get("/logout", authApiController.logout);

apiRouter.post("/wallet", walletApiController.createWallet);
apiRouter.get("/wallet",walletApiController.getWalletInfo);
apiRouter.put("/wallet",walletApiController.updateWallet)
apiRouter.delete("/wallet",walletApiController.deleteWallet)

apiRouter.post("/category", categoryApiController.createNewCategory);
apiRouter.put("/category", categoryApiController.updateCategory);
apiRouter.delete("/category", categoryApiController.deleteCategory);

apiRouter.get("/user/", authApiController.getDataUser);
apiRouter.get("/user/:idUser", authApiController.getDataUser);
apiRouter.patch("/user", authApiController.changePassword);
apiRouter.put("/user", authApiController.updateUser);


// apiRouter.get("/transaction/:offset&:period&:walletName&:fromDate&:toDate", transactionApiController.showTransaction);
// Test 2:54 pm
apiRouter.get("/transaction/:offset&:walletName&:fromDate&:toDate", transactionApiController.showTransaction);
apiRouter.post("/transaction", transactionApiController.postTransaction);
apiRouter.delete("/transaction/:_id&:status&:moneyTrade&:nameWallet", transactionApiController.deleteTransaction);
apiRouter.put("/transaction", transactionApiController.updateTransaction);





export default apiRouter;