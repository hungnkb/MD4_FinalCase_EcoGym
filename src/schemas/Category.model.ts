import { Schema, model } from "mongoose";

interface ICategory {
    idUser: string,
    categoryList: Object,
    description: string,
}


const categorySchema = new Schema<ICategory>({
    idUser: String,
    categoryList: Object,
    description: String
})

const Category = model<ICategory>('Category', categorySchema);

export default Category;