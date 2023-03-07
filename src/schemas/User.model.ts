import { Schema, model } from "mongoose";

interface IUser {
  // image: String,
  email: string,
  password: string,
  role: { type: number; default: 2 },
  google: {
    id: {
      type: string;
    }
  },
  name: string,
  phoneNumber: string,
  address: string,
}

const userSchema = new Schema<IUser>({
  // image: String,
  email: String,
  password: String,
  role: { type: Number, default: 2 },

  google: {
    id: {
      type: String,
    },
  },
  name: String,
  phoneNumber: String,
  address: String,
});

const User = model<IUser>("User", userSchema);

export default User;