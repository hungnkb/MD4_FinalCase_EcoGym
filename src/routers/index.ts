import authorize from "../middleware/authorize";
import apiRouter from "./api.router";
import authRouter from "./auth.router";
import categoryRouter from "./category.router";
import homeRouter from "./home.router";

const route = (app) => {
  app.use("/", homeRouter);
  app.use("/category", categoryRouter);
  app.use("/auth", authRouter);
  app.use("/api", apiRouter);
};

export default route;
