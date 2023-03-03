"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routers_1 = __importDefault(require("./src/routers"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const wallet_router_1 = __importDefault(require("./src/routers/wallet.router"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8888;
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect('mongodb+srv://viethenry183081:VietHenry1803@cluster0.fvl1iwm.mongodb.net/ecogym')
    .then(() => console.log('DB Connected!'));
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(passport_1.default.initialize());
app.use((0, cookie_parser_1.default)(process.env.USER_CODE_SECRET));
(0, routers_1.default)(app);
app.use('/wallets', wallet_router_1.default);
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:3000/wallets/list");
});
//# sourceMappingURL=index.js.map