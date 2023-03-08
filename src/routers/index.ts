import authorize from "../middleware/authorize";
import apiRouter from "./api.router";
import authRouter from "./auth.router";
import categoryRouter from "./category.router";
import homeRouter from "./home.router";
import walletRouter from './wallet.router';

const route = (app) => {
  app.use("/", homeRouter);
  app.use("/category", categoryRouter);
  app.use("/wallet", walletRouter)
  app.use("/auth", authRouter);
  app.use("/api", apiRouter);
};

export default route;
