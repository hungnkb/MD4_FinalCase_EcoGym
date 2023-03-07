import { Request, Response } from "express";
import Category from "../../schemas/Category.model";
import token from "../user.controller";

class CategoryApiController {
  createNewCategory = async (req: Request, res: Response) => {
    let id = token.getIdUser(req, res);
    let idUser = id;
    let { categoryName, status } = req.body;

    // let newCategory = new Category(idUser, categoryName, status);
    try {
      let doneCategory = await Category.create ({idUser, status, categoryName})
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

  deleteCategory = async (req: Request, res: Response) => {
    let id = req.body.idCategory; 
    console.log(id);
    
    try {
      await Category.deleteOne({_id: id});
      res.status(200).json({ message: "Category deleted"})
    } catch(error) {
      console.log(error);
      
    }
  }

  updateCategory = async (req: Request, res: Response) => {
    // check if category exist -> update/edit
    // Frontend have to send current "nameCategory" and "newNameCategory"

    let id = token.getIdUser(req, res);
    let idUser =  id;
    let idCategory = req.body.idCategory

    let { categoryName, status } = req.body;
    let updateCategory = await Category.findOneAndUpdate(
        { idUser: idUser, _id: idCategory},
        { $set: { categoryName: categoryName, status: status } },
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