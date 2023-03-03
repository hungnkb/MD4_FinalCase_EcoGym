import { Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "../schemas/Book.model";

// const BookModel = mongoose.model('Book', Book)

class BookController {
  async showCreate(req: Request, res: Response) {

    res.render("createBook");
  }

  async createBook(req: Request, res: Response) {
    
    let newBook = new Book(req.body);
    try {
      let doneCreateBook = newBook.save();
      if (doneCreateBook) {
        res.send("Done");
      } else {
        console.log("Create book fail");
      }
    } catch {
      console.log("Create book fail");
    }
  }

  async showBook(req: Request, res: Response) {}
}

export default new BookController();
