"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = require("../schemas/User.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authorize {
    constructor() {
        this.admin = (req, res, next) => {
            let role = req.body.role;
            if (role === 1) {
                next();
            }
            else {
                res.redirect("/");
            }
        };
        this.user = async (req, res, next) => {
            if (req.signedCookies.authorization == undefined) {
                res.redirect("/auth/login");
            }
            else {
                let token = req.signedCookies.authorization.split(" ")[1];
                let user = jsonwebtoken_1.default.verify(token, process.env.USER_CODE_SECRET);
                let dateNow = Date.now();
                if (user.exp <= dateNow) {
                    res.redirect("/auth/login");
                }
                else {
                    let id = new Object(user.sub);
                    let userData = await User_model_1.User.findOne({ _id: id });
                    let role = Number(userData.role);
                    if (role === 2 || role === 1 || req.signedCookies.authorization === undefined) {
                        next();
                    }
                    else {
                        res.redirect("/");
                    }
                }
            }
        };
        this.guest = (req, res, next) => {
            let role = req.body.role;
            if (role !== 2 && role !== 1) {
                next();
            }
            else {
                res.redirect("/");
            }
        };
    }
}
exports.default = new Authorize();
//# sourceMappingURL=authorize.js.map