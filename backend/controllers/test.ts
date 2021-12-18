import { Request, Response } from 'express';
const testRouter = require('express').Router();

testRouter.get('/', (_req: Request, res: Response) => {
    res.send('test')
})


export default testRouter;