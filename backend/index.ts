import express from 'express';
import loginRouter from './controllers/login';
import userRouter from './controllers/user';
import mongoose from 'mongoose';

const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)

const connStr: string = 'mongodb+srv://fullstack:fullstack@cluster0.qynol.mongodb.net/account-system?retryWrites=true&w=majority';
mongoose.connect(connStr).then(_result => {
    console.log('Connected to MongoDB')
}).catch(error => {
    console.log(`Error connecting to MongoDB: ${error.message}`)
});

app.get('/', (_req, res) => {
    res.send('hello world!')
})


const PORT = 1337;
app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT}`)
})