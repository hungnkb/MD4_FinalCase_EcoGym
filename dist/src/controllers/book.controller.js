"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Book_model_1 = require("../schemas/Book.model");
class BookController {
    async showCreate(req, res) {
        res.render("createBook");
    }
    async createBook(req, res) {
        let newBook = new Book_model_1.Book(req.body);
        try {
            let doneCreateBook = newBook.save();
            if (doneCreateBook) {
                res.send("Done");
            }
            else {
                console.log("Create book fail");
            }
        }
        catch (_a) {
            console.log("Create book fail");
        }
    }
    async showBook(req, res) { }
}
exports.default = new BookController();
//# sourceMappingURL=book.controller.js.map