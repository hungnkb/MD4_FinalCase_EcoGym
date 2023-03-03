"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flow = void 0;
const mongoose_1 = require("mongoose");
const flowSchema = new mongoose_1.Schema({
    idUser: String,
    moneyTrade: Number,
    nameCategory: String,
    desc: String,
    timeTrade: Date
});
const Flow = (0, mongoose_1.model)('Wallet', flowSchema);
exports.Flow = Flow;
//# sourceMappingURL=Flow.model.js.map