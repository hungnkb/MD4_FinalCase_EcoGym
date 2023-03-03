import { Schema, model } from "mongoose";

interface ICategory {
    idUser: string,
    categoryName: string,
    description: string,
}


const categorySchema = new Schema<ICategory>({
    idUser: String,
    categoryName: String,
    description: String
})

const Category = model<ICategory>('Category', categorySchema);

export default Category;