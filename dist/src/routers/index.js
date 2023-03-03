"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_router_1 = __importDefault(require("./book.router"));
const api_router_1 = __importDefault(require("./api.router"));
const auth_router_1 = __importDefault(require("./auth.router"));
const home_router_1 = __importDefault(require("./home.router"));
const route = (app) => {
    app.use("/", home_router_1.default);
    app.use("/book", book_router_1.default);
    app.use("/auth", auth_router_1.default);
    app.use("/api", api_router_1.default);
};
exports.default = route;
//# sourceMappingURL=index.js.map