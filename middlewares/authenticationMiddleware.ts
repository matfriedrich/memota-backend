import {Application} from "express";
import passport = require("passport");
import {Strategy} from "passport-local";
import {getUserModel, IUser} from "../models/User";

export function initializeAuthentication(app: Application) {
    // authentication strategy
    passport.use(new Strategy(
        (user, password, callback) => {
            // build user model
            const User = getUserModel();

            User.findOne({username: user}, (err: any, usr: IUser) => {
                if (err) {
                    console.log("login error:" + err.message);
                    return callback(err);
                }

                if (usr === null) {
                    return callback(null, false);
                }

                return callback(null, usr);
            });
        },
    ));

    passport.serializeUser((user: IUser, callback) => {
        callback(null, user.id);
    });

    passport.deserializeUser((userid, callback) => {
        // build user model
        const User = getUserModel();

        User.findOne({id: userid}, (err: any, usr: IUser) => {
            if (err) {
                return callback(err);
            }

            callback(null, usr);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());
}
