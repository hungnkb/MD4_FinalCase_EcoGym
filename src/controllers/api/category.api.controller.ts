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
        let incomeCategory = [
          "Collect Interest",
          "Salary",
          "Other Income",
          "Incoming Transfer",
        ];
        let outcomeCategory = [
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
          categoryList: {
            incomeCategory: incomeCategory,
            outcomeCategory: outcomeCategory,
          },
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
    let { categoryName, category, categoryDescription } = req.body;

    let categoryByUser = await Category.findOne({ idUser: idUser });
    let isCategoryNameExist = false;
    if (category === "incomeCategory") {
      category = categoryByUser.categoryList.incomeCategory;
      let outcomeCategory = categoryByUser.categoryList.outcomeCategory

      for (let i = 0; i < category.length; i++) {
        if (category[i] == categoryName) {
          isCategoryNameExist = true;
          break;
        }
      }
      if (isCategoryNameExist) {
        res
          .status(400)
          .json({ message: "Category name is exist, please try again" });
      } else {
        category.push(categoryName);
        await Category.findOneAndUpdate(
          { idUser: idUser },
          { categoryList: { incomeCategory: category, outcomeCategory: outcomeCategory } },
          { new: true }
        ).then (newCategory => {
            res.status(200).json({message: 'Create category success', newCategory})
        }).catch(err => {
            console.log(err);
        });
      }
    } else {
        category = categoryByUser.categoryList.outcomeCategory;
        let incomeCategory = categoryByUser.categoryList.incomeCategory
  
        for (let i = 0; i < category.length; i++) {
          if (category[i] == categoryName) {
            isCategoryNameExist = true;
            break;
          }
        }
        if (isCategoryNameExist) {
          res
            .status(400)
            .json({ message: "Category name is exist, please try again" });
        } else {
          category.push(categoryName);
          await Category.findOneAndUpdate(
            { idUser: idUser },
            { categoryList: { incomeCategory: incomeCategory, outcomeCategory: category } },
            { new: true }
          ).then (newCategory => {
              res.status(200).json({message: 'Create category success', newCategory})
          }).catch(err => {
              console.log(err);
          });
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

  //   updateCategory = async (req: Request, res: Response) => {
  //     // check if category exist -> update/edit
  //     // Frontend have to send current "nameCategory" and "newNameCategory"

  //     let id = token.getIdUser(req, res);
  //     let idUser = req.body.idUser || req.params.idUser || id;
  //     let nameCategory: string = req.body.categoryName;
  //     let newNameCategory: string = req.body.newCategoryName;

  //     let categoryByUserId = await Category.findOne({ idUser: idUser });
  //     let categoryListArr = Object.values(categoryByUserId.categoryList);
  //     let doneCategory = false;

  //     for (let i = 0; i < categoryListArr.length; i++) {
  //       if (nameCategory == categoryListArr[i]) {
  //         categoryListArr[i] = newNameCategory;
  //         doneCategory = true;
  //         break;
  //       }
  //     }

  //     if (doneCategory) {
  //       await Category.findOneAndUpdate(
  //         { idUser: idUser },
  //         { categoryList: categoryListArr },
  //         { new: true }
  //       )
  //         .then((result) => {
  //           res.status(200).json({ message: "Update success", result });
  //         })
  //         .catch((error) => {
  //           res.status(400).json({ message: "Update fail" });
  //         });
  //     } else {
  //       res.status(400).json({ message: "Update fail" });
  //     }
  //   };
}

export default new CategoryApiController();
