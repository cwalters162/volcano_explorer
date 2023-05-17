import {NextFunction, Request, Response} from "express";

export function isAuthenticated (req: Request, res: Response, next: NextFunction) {
    if (req.session.user) {
        next()
    }
    else {
        res.redirect('/user/login')
    }
}