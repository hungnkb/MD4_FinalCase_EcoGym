"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../schemas/User.model"));
class authController {
    constructor() {
        this.showLogin = async (req, res) => {
            res.render("login");
        };
        this.showRegister = async (req, res) => {
            res.render("register");
        };
        this.loginOverGoogle = async (req, res) => {
            let id = req["user"].id;
            let user = await User_model_1.default.findOne({ _id: id });
            let token = jsonwebtoken_1.default.sign({
                iss: "Book Store",
                sub: id,
                iat: new Date().getTime(),
            }, process.env.USER_CODE_SECRET, { expiresIn: 604800000 });
            res.cookie("authorization", "Bearer " + token, { signed: true });
            res.redirect('/');
        };
    }
}
;
exports.default = new authController();
//# sourceMappingURL=auth.controller.js.map