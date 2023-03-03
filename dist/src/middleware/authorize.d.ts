import { Request, Response, NextFunction } from "express";
declare class Authorize {
    admin: (req: Request, res: Response, next: NextFunction) => void;
    user: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    guest: (req: Request, res: Response, next: NextFunction) => void;
}
declare const _default: Authorize;
export default _default;
