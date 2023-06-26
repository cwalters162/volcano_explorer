import {NODE_ENV, SESSION_SECRET} from "./envConfig";
import {SessionOptions} from "express-session";
import User from "../models/User";

declare module 'express-session' {
    interface SessionData {
        user: User | null
    }
}

function getSessionOptions(): SessionOptions {
    if (NODE_ENV === "development") {
        return {
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
            }
        }
    } else {
        return {
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: true
        }
    }
}

const SESSION_OPTIONS: SessionOptions = getSessionOptions()



export default SESSION_OPTIONS