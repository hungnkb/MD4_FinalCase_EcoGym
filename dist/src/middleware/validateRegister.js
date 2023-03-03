"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class validateRegister {
    constructor() {
        this.check = (username, password) => {
            let regexpUsername = new RegExp(/\w{6,20}$/);
            let regexpPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-1])(?=.*[!@#$%^?&*-])[a-zA-Z\d!@#$?%^&*-].{8,}$/);
            let resultUsername = regexpUsername.test(username);
            let resultPassword = regexpPassword.test(password);
            let result = '';
            console.log(resultPassword);
            if (resultUsername && resultPassword) {
                result = 'bothValid';
            }
            else if (!resultUsername && resultPassword) {
                result = 'usernameInvalid';
            }
            else if (resultUsername && !resultPassword) {
                result = 'passwordInvalid';
            }
            else if (!resultUsername && !resultPassword) {
                result = 'bothInvalid';
            }
            return result;
        };
    }
}
exports.default = new validateRegister();
//# sourceMappingURL=validateRegister.js.map