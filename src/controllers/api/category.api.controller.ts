import { Request, Response } from "express";
import Category from "../../schemas/Category.model";
import token from "../user.controller";

class CategoryApiController {
  createCategoryPackage = async (req: Request, res: Response) => {
    // Create default Categories for new User
    let idUser = token.getIdUser(req, res);
    try {
      let categoryList = await Category.find({ idUser: idUser });

      if (categoryList.length === 0) {
        let categoryPackage = [
          "Food & Beverage",
          "Transportation",
          "Rentals",
          "Water Bill",
          "Phone Bill",
          "Electricity Bill",
          "Gas Bill",
          "Television Bill",
          "Internet Bill",
          "Other Utility Bill",
          "Vehicle Maintenance",
          "Medical Check Up",
          "Insurances",
          "Education",
          "Houseware",
          "Personal Items",
          "Pets",
          "Home Servicesm",
          "Other Expense",
          "Fitness",
          "Makeup",
          "Gifts & Donations",
          "Streaming Service",
          "Fun Money",
          "Investment",
          "Pay Interest",
          "Outgoing Transfer",
        ];

        let categories = new Category({
          idUser: idUser,
          categoryList: categoryPackage,
        });

        try {
          await categories.save();
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  createNewCategory = async (req: Request, res: Response) => {
    let id = token.getIdUser(req, res);
    let idUser = req.body.idUser || id;

    let categoryName = req.body.categoryName;
    let categoryDescription = req.body.categoryDescription;

    let categoryByUser = await Category.findOne({ idUser: idUser });
    let categoryList = Object.values(categoryByUser.categoryList);

    // check if Category Name is exist with idUser

    let isCategoryExist = false;
    for (let i = 0; i < categoryList.length; i++) {
      if (categoryName == categoryList[i]) {
        isCategoryExist = true;
        break;
      }
    }

    if (isCategoryExist) {
      res.status(400).json("Category is exist, please try again");
    } else {
      categoryList.push(categoryName);
      let newCategoryList = { ...categoryList };
      try {
        let doneCreateCategory = await Category.updateOne(
          { idUser: idUser },
          { categoryList: newCategoryList }
        );
        res.status(200).json({ message: "Create category success" });
      } catch {
        res.status(400).json({ message: "Create category fail" });
      }
    }
  };

  showCategoryByUser = async (req: Request, res: Response) => {
    let id = token.getIdUser(req, res);
    let idUser = req.body.idUser || req.params.idUser || id;

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
    let id = token.getIdUser(req, res);
    let idUser = req.body.idUser || req.params.idUser || id;
    let nameCategory: string = req.body.categoryName;
    let newNameCategory: string = req.body.newCategoryName;

    let categoryByUserId = await Category.findOne({ idUser: idUser });
    let categoryListArr = Object.values(categoryByUserId.categoryList);
    let doneCategory = false;

    for (let i = 0; i < categoryListArr.length; i++) {
      if (nameCategory == categoryListArr[i]) {
        categoryListArr[i] = newNameCategory;
        doneCategory = true;
        break;
      }
    }

    if (doneCategory) {
      await Category.findOneAndUpdate(
        { idUser: idUser },
        { categoryList: categoryListArr },
        { new: true }
      )
        .then((result) => {
          res.status(200).json({ message: "Update success", result });
        })
        .catch((error) => {
          res.status(400).json({ message: "Update fail" });
        });
    } else {
      res.status(400).json({ message: "Update fail" });
    }
  };
}

export default new CategoryApiController();
