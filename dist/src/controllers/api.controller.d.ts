import { Request, Response } from "express";
declare class apiController {
    register: (req: Request, res: Response) => Promise<any>;
    login: (req: Request, res: Response) => Promise<void>;
    logout: (req: Request, res: Response) => Promise<void>;
}
declare const _default: apiController;
export default _default;
