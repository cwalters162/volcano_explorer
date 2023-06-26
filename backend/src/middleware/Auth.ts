import {NextFunction, Request, Response} from "express";
import {ZUserSchema} from "../models/User";

export function isAuthenticated (req: Request, res: Response, next: NextFunction) {
    try {
        ZUserSchema.parse(req.session.user)
        next()
    } catch{
        res.redirect('/auth')
    }
}