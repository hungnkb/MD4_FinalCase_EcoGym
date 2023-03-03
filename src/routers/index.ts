import apiRouter from "./api.router";
import authRouter from "./auth.router";
import homeRouter from "./home.router";
import authorize from "../middleware/authorize";

const route = (app) => {
  app.use("/", homeRouter);
  app.use("/auth", authRouter);
  app.use("/api", apiRouter);
};

export default route;
