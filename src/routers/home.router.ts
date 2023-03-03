import homeController from "../controllers/home.controller";
import express from "express";
import authorize from "../middleware/authorize";

const homeRouter = express.Router();

homeRouter.get("/", authorize.user, homeController.showHome);

export default homeRouter;
