import authController from "../controllers/auth.controller";
import express, { request } from "express";
import passport from "../middleware/passport";
import { Request, Response } from "express";
import authorize from "../middleware/authorize";
import authApiController from "../controllers/api/auth.api.controller";

const authRouter = express.Router();

// User URL = /auth/...

authRouter.get("/login", authorize.guest, authController.showLogin);
authRouter.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.loginOverGoogle
);

authRouter.get("/register", authorize.guest, authController.showRegister);

export default authRouter;
