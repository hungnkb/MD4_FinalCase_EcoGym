import { Schema, model } from "mongoose";

interface IUser {
  email: string;
  password: string;
  role: { type: number; default: 2 };
  google: {
    id: {
      type: string;
    };
  };
}

const userSchema = new Schema<IUser>({
  email: String,
  password: String,
  role: { type: Number, default: 2 },
  google: {
    id: {
      type: String,
    },
  },
});

const User = model<IUser>("User", userSchema);

export { User };
