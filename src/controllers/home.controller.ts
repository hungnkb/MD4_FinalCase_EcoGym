import {Request, Response} from 'express';

class homeController {
    showHome = (req: Request, res: Response) => {
        res.render('home');
    }
}

export default new homeController();

