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
    // get id user
    let id = token.getIdUser(req, res);
    // let idUser = req.body.idUser || req.params.idUser || id ;
    // get default category
    let listDefault = await Category.find({idUser: "null"});
    let listDefaultName = [];
    listDefault.forEach( category => {
      listDefaultName.push(category.categoryName);
    })
    let userCategory = await Category.find({idUser: id});
    let listUserCategory = []
    userCategory.forEach( category => {
      listUserCategory.push(category.categoryName);
    })
    let listCategory = []
    listUserCategory.forEach(categoryName => {
      for (let i = 0; i < listDefaultName.length; i++) {
        if (categoryName === listDefaultName[i]) {
          listDefaultName.splice(i, 1);
        }
      }
    })
    listCategory = [...listDefaultName,...listUserCategory]
    res.render('categoryManager', {listCategory, idUser: id})
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