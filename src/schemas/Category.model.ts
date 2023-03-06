import { Schema, model } from "mongoose";

interface ICategory {
  idUser: string,
  categoryName: string,
  status: string,
}

const categorySchema = new Schema<ICategory>({
  idUser: String,
  categoryName: String,
  status: String
});

const Category = model<ICategory>("Category", categorySchema);

export default Category;
