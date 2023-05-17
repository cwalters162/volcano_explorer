import {NODE_ENV} from "./envConfig";
import {SessionOptions} from "express-session";

function getSessionOptions(): SessionOptions {
    if (NODE_ENV === "development") {
        return {
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true
        }
    } else {
        return {
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true
        }
    }
}

const SESSION_OPTIONS: SessionOptions = getSessionOptions()



export default SESSION_OPTIONS