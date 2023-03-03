import { Schema, model } from "mongoose";

interface ICategory {
    idUser: String,
    categoryName: String,
    desc: String
}


const categorySchema = new Schema<ICategory>({
    idUser: String,
    categoryName: String,
    desc: String
})

const Category = model<ICategory>('Wallet', categorySchema);

export {Category};