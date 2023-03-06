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

apiRouter.post("/category", categoryApiController.createNewCategory);

apiRouter.get("/category", categoryApiController.showCategoryByUser);
apiRouter.get("/category/:idUser", categoryApiController.showCategoryByUser);
// apiRouter.patch("/category/", categoryApiController.updateCategory);
// apiRouter.patch("/category/:idUser", categoryApiController.updateCategory);

apiRouter.get("/user/", authApiController.getDataUser);
apiRouter.get("/user/:idUser", authApiController.getDataUser);
apiRouter.get("/transaction/:offset", transactionApiController.showTransaction);
apiRouter.post("/transaction", transactionApiController.postTransaction);
apiRouter.delete("/transaction/:_id", transactionApiController.deleteTransaction);


export default apiRouter;
