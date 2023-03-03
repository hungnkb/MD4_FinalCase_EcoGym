import authController from "../controllers/auth.controller";
import express, { request } from "express";
import passport from "../middleware/passport";
import { Request, Response } from "express";
import authorize from "../middleware/authorize";
import apiController from "../controllers/api.controller";

const authRouter = express.Router();

// User URL = /auth/...

authRouter.get("/login", authController.showLogin);
authRouter.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.loginOverGoogle
);
authRouter.get("/register", authController.showRegister);

export default authRouter;
