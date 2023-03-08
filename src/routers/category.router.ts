import express from 'express';
import categoryController from '../controllers/category.controller';
import authorize  from '../middleware/authorize';
const categoryRouter = express.Router();
    categoryRouter.get("/", authorize.user, categoryController.showCategoryByUser)

export default categoryRouter;