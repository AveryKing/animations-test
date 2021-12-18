import {Request, Response} from 'express';
import { User } from '../models/User'
const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET = 'H(#(#Ji2mk34jruje9k2i3ij4ufnhv';

loginRouter.post('/', async (req: Request, res: Response) => {
    const body = req.body

    const user = await User.findOne({username: body.username});
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.password);

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'The credentials provided are incorrect.'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, SECRET);

    return res.status(200)
        .send({
            token,
            username: user.username,
            userId: user._id
        })

})

export default loginRouter;