import apiRouter from "./api.router";
import authRouter from "./auth.router";
import homeRouter from "./home.router";
import authorize from "../middleware/authorize";
import walletRouter from "./wallet.router";

const route = (app) => {
  app.use("/", homeRouter);
  app.use("/auth", authRouter);
  app.use("/api", apiRouter);
  // app.use("/wallet", walletRouter);
};

export default route;
