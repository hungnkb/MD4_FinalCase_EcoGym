import { Schema, model } from "mongoose";

interface ICategory {
    idUser: string,
    categoryList: {
        incomeCategory: string[],
        outcomeCategory: string[],
    },
    description: string,
}


const categorySchema = new Schema<ICategory>({
    idUser: String,
    categoryList: {
        incomeCategory: Array,
        outcomeCategory: Array,
    },
    description: String
})

const Category = model<ICategory>('Category', categorySchema);

export default Category;