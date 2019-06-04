import {Request, Response} from "express";
import {User} from "../models/User";

export let index = (req: Request, res: Response) => {
    const user1 = new User({username: "test"});

    // since 'unique' isnt a 'real' validator, it only work after index is built, which is why we need to wait for
    // 'init' to finish
    User.init()
        .then(() => {
            user1.save((err) => {
                console.log(err);
            });
        });

    User.countDocuments((err, count) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json({message: "found " + count + " documents!"});
        }
    });

};
