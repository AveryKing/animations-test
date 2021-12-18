import { Request, Response } from 'express';
import { User, IUser } from '../models/User'

const userRouter = require('express').Router();

userRouter.post('/', (req: Request, res: Response) => {
    if(!req.body.email || !req.body.username || !req.body.password) {
        return res.json({
            error:'The parameters provided are invalid.'
        });
    }

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const user: IUser = new User({
        email: email,
        username: username,
        password: password
    });

    user.save().then(newUser => {
        return res.send(newUser)
    }).catch(_error => {
        return res.json({
            error:'There was an error with user registration.'
        });
    })

    return;

})


export default userRouter;