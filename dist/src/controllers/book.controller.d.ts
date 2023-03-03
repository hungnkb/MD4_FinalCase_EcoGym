import { Request, Response } from "express";
declare class BookController {
    showCreate(req: Request, res: Response): Promise<void>;
    createBook(req: Request, res: Response): Promise<void>;
    showBook(req: Request, res: Response): Promise<void>;
}
declare const _default: BookController;
export default _default;
