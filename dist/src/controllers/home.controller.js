"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class homeController {
    constructor() {
        this.showHome = (req, res) => {
            res.render('home');
        };
    }
}
exports.default = new homeController();
//# sourceMappingURL=home.controller.js.map