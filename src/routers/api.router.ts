import authApiController from "../controllers/api/auth.api.controller";
import express from "express";
import walletApiController from "../controllers/api/wallet.api.controller";

const apiRouter = express.Router();

// apiRouter.get('/login', apiController.showLogin);
apiRouter.post("/register", authApiController.register);
apiRouter.post("/login", authApiController.login);
apiRouter.get("/logout", authApiController.logout);

apiRouter.post("/wallet", walletApiController.createWallet);

apiRouter.post("/category", walletApiController.createCategory);

export default apiRouter;
