import { Schema, model } from "mongoose";

interface IProfile {
    fullname: string,
    age: number,
    address: string,
    phone: number,
}


const profileSchema = new Schema<IProfile>({
    fullname: String,
    age: Number,
    address: String,
    phone: Number,
})

const Profile= model<IProfile>('Profile', profileSchema);

export {Profile};