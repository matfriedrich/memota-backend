import cookieParser = require("cookie-parser");
import cors = require("cors");
import express = require("express");
import * as http from "http";
import createError = require("http-errors");
import mongoose from "mongoose";
import path = require("path");
import {startWebsocket} from "./middlewares/websocketMiddleware";
import routes from "./routes";

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// allow everything CORS at the moment, not best practice
app.use(cors());
app.options("*", cors());

// routing
app.use("/", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err: IError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // set locals, only providing error in development
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({message: "error"});
    next();
});

mongoose.connect("mongodb://localhost/memota", {useNewUrlParser: true});

const server = http.createServer(app);

startWebsocket();

server.listen(3000, () => {
    console.log("Express server listening on localhost:3000");
});

module.exports = app;

// should put in seperate file, not sure about correct location yet
interface IError {
    status?: number;
}
