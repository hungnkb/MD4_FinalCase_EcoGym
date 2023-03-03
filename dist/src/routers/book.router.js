"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const express_1 = __importDefault(require("express"));
const authorize_1 = __importDefault(require("../middleware/authorize"));
const bookRouter = express_1.default.Router();
bookRouter.get("/create", authorize_1.default.admin, book_controller_1.default.showCreate);
bookRouter.post("/create", authorize_1.default.admin, book_controller_1.default.createBook);
exports.default = bookRouter;
//# sourceMappingURL=book.router.js.map