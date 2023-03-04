"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    idUser: String,
    moneyTrade: Number,
    nameCategory: String,
    desc: String,
    timeTrade: Date
});
const Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
exports.default = Transaction;
//# sourceMappingURL=Flow.model.js.map