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
const connectDB_1 = __importDefault(require("./src/config/connectDB"));
const viewengine_1 = __importDefault(require("./src/config/viewengine"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8888;
mongoose_1.default.set('strictQuery', true);
(0, viewengine_1.default)(app);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(passport_1.default.initialize());
app.use((0, cookie_parser_1.default)(process.env.USER_CODE_SECRET));
(0, routers_1.default)(app);
(async () => {
    try {
        await (0, connectDB_1.default)();
        app.listen(PORT, () => {
            console.log(`App is running: http://localhost:${PORT}/auth/login`);
        });
    }
    catch (error) {
        console.log(error);
    }
})();
//# sourceMappingURL=index.js.map