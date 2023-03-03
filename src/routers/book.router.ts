import BookController from "../controllers/book.controller";
import express from "express";
import authorize from "../middleware/authorize";

const bookRouter = express.Router();

bookRouter.get("/create", authorize.admin, BookController.showCreate);
bookRouter.post("/create", authorize.admin, BookController.createBook);

export default bookRouter;
