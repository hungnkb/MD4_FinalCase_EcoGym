"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_controller_1 = __importDefault(require("../controllers/api.controller"));
const express_1 = __importDefault(require("express"));
const apiRouter = express_1.default.Router();
apiRouter.post('/register', api_controller_1.default.register);
apiRouter.post('/login', api_controller_1.default.login);
apiRouter.get('/logout', api_controller_1.default.logout);
exports.default = apiRouter;
//# sourceMappingURL=api.router.js.map