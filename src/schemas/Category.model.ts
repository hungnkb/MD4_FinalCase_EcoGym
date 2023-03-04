import { Schema, model } from "mongoose";

interface ICategory {
    idUser: string,
    categoryList: string[],
    description: string,
}


const categorySchema = new Schema<ICategory>({
    idUser: String,
    categoryList: Array,
    description: String
})

const Category = model<ICategory>('Category', categorySchema);

export default Category;