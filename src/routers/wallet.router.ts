import express from 'express';
import walletApiController from '../controllers/api/wallet.api.controller';
import wallerController from '../controllers/wallet.controller';
import authorize  from '../middleware/authorize';
const walletRouter = express.Router();
    walletRouter.get("/", authorize.user, wallerController.showWalletByUser)
export default walletRouter;