"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbState = [
    {
        value: 0,
        label: "disconnected",
    },
    {
        value: 1,
        label: "connected",
    },
    {
        value: 2,
        label: "connecting",
    },
    {
        value: 3,
        label: "disconnecting",
    },
];
const connectDB = async () => {
    const options = {
        dbName: process.env.DB_NAME,
    };
    mongoose_1.default.connect(process.env.DB_HOST, options);
    const state = Number(mongoose_1.default.connection.readyState);
    console.log(dbState.find((f) => f.value === state).label, "to database");
};
exports.default = connectDB;
//# sourceMappingURL=connectDB.js.map