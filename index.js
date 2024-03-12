const express = require('express')
const { connectToMongodb } = require('./connection')
const urlRouter = require('./routes/url')
const userRouter = require('./routes/user')
const staticRoute = require('./routes/staticRoute')
const path = require('path')
const cookieParser = require('cookie-parser');
const { checkForAuthentication, restrictTo } = require('./middlewares/auth')

const app = express();

const PORT = 8000;


//mongodb connection
connectToMongodb('mongodb://127.0.0.1:27017/short-url-authorization')
    .then(() => console.log('Mongodb connected!'))
    .catch((err) => console.log('Mongodb error', err))

//connect ejs
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

//middlewares
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(checkForAuthentication)

//routes
app.use('/url',restrictTo(['NORMAL','ADMIN']), urlRouter)
app.use('/user', userRouter)
app.use('/', staticRoute)

app.listen(PORT, () => console.log('Server start at port', PORT))