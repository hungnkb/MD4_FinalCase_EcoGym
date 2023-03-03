import { Request, Response } from "express";
declare class authController {
    showLogin: (req: Request, res: Response) => Promise<void>;
    showRegister: (req: Request, res: Response) => Promise<void>;
    loginOverGoogle: (req: Request, res: Response) => Promise<void>;
}
declare const _default: authController;
export default _default;
