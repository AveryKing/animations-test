const loginRouter = require('express').Router();

import { Request, Response } from 'express';

loginRouter.post('/', async (_req:Request, res:Response) => {
   res.send('login')

})

export default loginRouter;