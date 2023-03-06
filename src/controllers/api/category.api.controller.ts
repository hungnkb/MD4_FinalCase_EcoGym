import { Request, Response } from "express";
import Category from "../../schemas/Category.model";
import token from "../user.controller";

class CategoryApiController {
  createNewCategory = async (req: Request, res: Response) => {
    let id = token.getIdUser(req, res);
    let idUser = req.body.idUser || id;
    let { categoryName, status } = req.body;

    let newCategory = new Category(idUser, categoryName, status);
    try {
      let doneCategory = await newCategory.save();
      if (doneCategory) {
        res
            .status(200)
            .json({ message: "Create category success", doneCategory });
      } else {
        res.status(500).json({ message: "Create category fail" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  showCategoryByUser = async (req: Request, res: Response) => {
    let id = token.getIdUser(req, res);
    let idUser = req.body.idUser || req.params.idUser || id || "null";

    try {
      await Category.find({ idUser: idUser })
          .then((data) => {
            console.log(data);
            res.status(200).json({ categoryList: data });
          })
          .catch((error) => {
            console.log(error);
          });
    } catch (error) {
      console.log(error);
    }
  };

  updateCategory = async (req: Request, res: Response) => {
    // check if category exist -> update/edit
    // Frontend have to send current "nameCategory" and "newNameCategory"

    let id = token.getIdUser(req, res);
    let idUser = req.body.idUser || id;
    let { newNameCategory, status, currentNameCategory } = req.body;

    try {
    } catch (error) {}
    let updateCategory = await Category.findOneAndUpdate(
        { idUser: idUser, categoryName: currentNameCategory },
        { $set: { nameCategory: newNameCategory } },
        { new: true }
    );
    if (updateCategory) {
      res
          .status(200)
          .json({ message: "Update category success", updateCategory });
    } else {
      res.status(500).json({ message: "Update category fail" });
    }
  };
}

export default new CategoryApiController();