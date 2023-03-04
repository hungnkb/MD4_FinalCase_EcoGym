"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    idUser: String,
    categoryList: {
        incomeCategory: Array,
        outcomeCategory: Array,
    },
    description: String
});
const Category = (0, mongoose_1.model)('Category', categorySchema);
exports.default = Category;
//# sourceMappingURL=Category.model.js.map