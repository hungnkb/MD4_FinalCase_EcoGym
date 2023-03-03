"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = require("../schemas/User.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateRegister_1 = __importDefault(require("../middleware/validateRegister"));
const qs_1 = __importDefault(require("qs"));
class apiController {
    constructor() {
        this.register = async (req, res) => {
            try {
                let { username, password } = req.body;
                let validateResult = validateRegister_1.default.check(username, password);
                if (validateResult === "bothValid") {
                    let isUsernameExist = await User_model_1.User.findOne({ username: username });
                    if (isUsernameExist) {
                        res.status(400).json({ message: 'Register fail' });
                    }
                    else {
                        const salt = await bcrypt_1.default.genSaltSync(10);
                        password = await bcrypt_1.default.hashSync(password, salt);
                        let newUser = new User_model_1.User({ username, password });
                        await newUser.save();
                        res.status(200).json({ message: "Register success" });
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
            let { username, password } = req.body;
            let user = await User_model_1.User.findOne({ username: username });
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
                        res.status(400).json({ message: "wrong password" });
                    }
                });
            }
        };
        this.logout = async (req, res) => {
            let cookieObj = qs_1.default.parse(req.headers.cookie);
            let name = Object.keys(cookieObj)[0];
            res.clearCookie(name).status(200).json({ message: 'logout success' });
        };
    }
}
exports.default = new apiController();
//# sourceMappingURL=api.controller.js.map