import { Schema, model } from "mongoose";

interface IUser {
    username: string,
    password: string,
    role: {type: number, default: 2},
    google: {
        id: {
            type: string,
        },
    }
}


const userSchema = new Schema<IUser>({
    username: String,
    password: String,
    role: {type: Number, default: 2},
    google: {
        id: {
            type: String,
        }
    }
})

const User = model<IUser>('User', userSchema);

export {User};