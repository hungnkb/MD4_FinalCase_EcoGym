"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const mongoose_1 = require("mongoose");
const walletSchema = new mongoose_1.Schema({
    idUser: String,
    walletName: String,
    icon: String,
    totalMoneyLeft: Number
});
const Wallet = (0, mongoose_1.model)('Wallet', walletSchema);
exports.Wallet = Wallet;
//# sourceMappingURL=Waller.model.js.map