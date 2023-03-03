"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require("path");
const configViewEngine = (app) => {
    app.set('view engine', 'ejs');
    app.set('views', 'src/views');
    app.use(express_1.default.static(path.join("public")));
};
exports.default = configViewEngine;
//# sourceMappingURL=viewengine.js.map