import express from 'express';
import loginRouter from './controllers/login';
import testRouter from './controllers/test';
const app = express();

app.use('/api/login', loginRouter)
app.use('/api/test', testRouter)

app.get('/', (_req,res) => {
    res.send('hello world!')
})


const PORT = 1337;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})