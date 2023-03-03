"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../middleware/passport"));
const authRouter = express_1.default.Router();
authRouter.get("/login", auth_controller_1.default.showLogin);
authRouter.get("/login/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", passport_1.default.authenticate("google", { session: false }), auth_controller_1.default.loginOverGoogle);
authRouter.get("/register", auth_controller_1.default.showRegister);
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map