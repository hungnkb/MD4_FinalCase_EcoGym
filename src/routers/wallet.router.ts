import { Router } from 'express';
const walletRoutes = Router();
import Wallet from "../schemas/Waller.model"
import multer from 'multer';
const upload = multer();


bookRoutes.get('/create', (req, res) => {

    res.render("createBook");

});



bookRoutes.post('/create', upload.none(), async (req, res) => {

    try {
        const bookNew = new Book(req.body);
        const book = await bookNew.save();
        if (book) {
            res.redirect("/book/list");
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});



bookRoutes.post('/update', upload.none(), async (req, res) => {
    try {
        const book = await Book.findOne({ _id: req.body.id });
        book.title = req.body.title;
        book.description = req.body.description;
        book.author = req.body.author;
        await book.save();
        if (book) {
            res.redirect("/book/list");
        } else {res.render("error");

        }
    } catch (err) {
        res.render("error");
    }

});

bookRoutes.get('/list', async (req, res) => {

    try {

        let limit: number;

        let offset: number;

        if(!req.query.limit || !req.query.limit) {

            limit = 3;

            offset = 0;

        } else {

            limit = parseInt(req.query.limit as string);

            offset = parseInt(req.query.offset as string);

        }

        const books = await Book.find().limit(limit).skip(limit*offset);;

        res.render("listBook", { books: books });

    } catch {

        res.render("error");

    }

});



bookRoutes.get('/update/:id', async (req, res) => {

    try {

        const book = await Book.findOne({ _id: req.params.id });

        console.log(book, 'book')

        if (book) {

            res.render("updateBook", {book: book})

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});



bookRoutes.delete('/delete/:id', async (req, res) => {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        if (book) {
            await book.remove();
            res.status(200).json({ message: "success" });
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});


export default walletRoutes;
