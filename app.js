const express = require('express');
const postRouter = require('./routes/postRouter')
const profileRouter = require('./routes/profileRouter')
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')
const morgan = require('morgan')
const dotenv = require('dotenv')
const app = express();

dotenv.config({path: './config.env'})

const bodyParser = require('body-parser')
//middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/users', userRouter)
app.use('/profile', profileRouter)
app.use('/posts', postRouter)
app.use('/auth', authRouter)

module.exports = app;