"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = __importDefault(require("../schemas/User.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateRegister_1 = __importDefault(require("../middleware/validateRegister"));
const qs_1 = __importDefault(require("qs"));
const Waller_model_1 = require("../schemas/Waller.model");
class apiController {
    constructor() {
        this.register = async (req, res) => {
            try {
                let { email, password } = req.body;
                let validateResult = validateRegister_1.default.check(email, password);
                if (validateResult === "bothValid") {
                    let isEmailExist = await User_model_1.default.findOne({ email: email });
                    if (isEmailExist) {
                        res.status(400).json({ message: "Register fail" });
                    }
                    else {
                        const salt = await bcrypt_1.default.genSaltSync(10);
                        password = await bcrypt_1.default.hashSync(password, salt);
                        let newUser = await User_model_1.default.create({ email, password });
                        res.status(200).json({ message: "Register success", data: newUser });
                    }
                }
                else {
                    res.status(400).json({ message: validateResult });
                }
            }
            catch (error) {
                console.log(error);
            }
        };
        this.login = async (req, res) => {
            let { email, password } = req.body;
            let user = await User_model_1.default.findOne({ email: email });
            if (user) {
                bcrypt_1.default.compare(password, user.password, (err, result) => {
                    if (result) {
                        let token = jsonwebtoken_1.default.sign({
                            iss: "Book Store",
                            sub: user.id,
                            iat: new Date().getTime(),
                        }, process.env.USER_CODE_SECRET, { expiresIn: 604800000 });
                        res.cookie("authorization", "Bearer " + token, { signed: true });
                        res.status(200).json({ message: "Login success", user, token });
                    }
                    else {
                        res.status(400).json({ message: "Wrong password, please try again" });
                    }
                });
            }
            else {
                res.status(400).json({ message: "Email is not exist, please try again" });
            }
        };
        this.logout = async (req, res) => {
            let cookieObj = qs_1.default.parse(req.headers.cookie);
            let name = Object.keys(cookieObj)[0];
            res.clearCookie(name).status(200).json({ message: "logout success" });
        };
        this.createWallet = async (req, res) => {
            let { idUser, walletName: string, icon, totalMoneyLeft } = req.body;
            let wallet = await Waller_model_1.Wallet.find({ walletName: walletName });
            if (wallet) {
                res.status(400).json('Wallet name is exist, please try again');
            }
            else {
            }
        };
    }
}
exports.default = new apiController();
//# sourceMappingURL=api.controller.js.map