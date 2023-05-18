
import app from "./app";
import * as path from "path";
import express from "express";
import MockDBRepository from "./repositories/mockDBRepository";
import {FQDN, NODE_ENV} from "./configs/envConfig";
import * as fs from "fs";
import * as https from "https";
import AuthRouter from "./routes/AuthRouter";
import SESSION_OPTIONS from "./configs/SessionOptions";
import session from "express-session";
import {isAuthenticated} from "./middleware/Auth";
import AuthController from "./controllers/AuthController";
import UserService from "./services/UserService";
import AuthService from "./services/AuthService";

app.use(express.json())
app.use(session(SESSION_OPTIONS))


app.all('/', (_req, res) => {
    res.sendFile("./index.html", {root: path.join(__dirname, '.')})
});

app.use("/auth", AuthRouter)

app.use(isAuthenticated)

app.use("/protected", (_req, res) => {
    res.status(200).json({status: "Good", isProtected: true})
})


if (NODE_ENV === "development") {
    app.listen(3000, '0.0.0.0', () => {
        const db = new MockDBRepository()
        const userService = new UserService(db)
        const authService = new AuthService(db)
        app.locals.authController = new AuthController(userService, authService)
        console.log(`HTTP Development Server listening on port 3000`);
    });
}

if (NODE_ENV === 'production') {
    const httpApp = express();
    httpApp.all('*', (_req, res) => res.redirect(`https://${FQDN}`));
    httpApp.listen(80, () => {
        console.log(`HTTP server listening: http://${FQDN}`)
    })

    try {
        https.createServer({
                cert: fs.readFileSync('fullchain.pem'),
                key: fs.readFileSync('privkey.pem'),
            },
            app
        ).listen(443, '0.0.0.0');

        console.log(`HTTPS Server listening on https://${FQDN}${443}`)
    } catch (e) {
        console.log(`HTTPS Server failed to start: ${e}`)
    }
}