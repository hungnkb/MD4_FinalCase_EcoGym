import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
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
const connectDB = async() => {
    const options = {
        dbName: process.env.DB_NAME,
      };
    mongoose.connect(process.env.DB_HOST, options);
    const state = Number(mongoose.connection.readyState);
  console.log(dbState.find((f) => f.value === state).label, "to database");
}
export default connectDB;