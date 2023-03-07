import express from 'express';
import categoryApiController from '../controllers/api/category.api.controller';
import categoryController from '../controllers/category.controller';
import authorize  from '../middleware/authorize';
const categoryRouter = express.Router();
    categoryRouter.get("/", authorize.user, categoryController.showCategoryByUser)

export default categoryRouter;