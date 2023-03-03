"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Waller_model_1 = require("../schemas/Waller.model");
class homeController {
    constructor() {
        this.showHome = async (req, res) => {
            let token = req.signedCookies.authorization.split(" ")[1];
            let user = jsonwebtoken_1.default.verify(token, process.env.USER_CODE_SECRET);
            let id = new Object(user.sub);
            let wallets = await Waller_model_1.Wallet.find({ idUser: id });
            if (wallets.length === 0) {
                let newWallet = {
                    idUser: id,
                    walletName: `My first wallet`,
                    icon: 1,
                    totalMoneyLeft: 0,
                };
            }
            res.render("home");
        };
    }
}
exports.default = new homeController();
//# sourceMappingURL=home.controller.js.map