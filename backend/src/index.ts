import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// importing routes
import userRouter from './routes/user.routes';
import restaurantRouter from './routes/restaurant.routes';
import productRouter from './routes/product.routes';

const app = express()

app.use(cors({
    origin:'http://localhost:3000',
    credentials : true
}))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({limit:'16kb' , extended : true}))
app.use(express.static('public'))

app.use(cookieParser())

app.use('/api/users',userRouter)
app.use('/api/restaurants',restaurantRouter)
app.use('/api/products',productRouter)

app.listen(3000,()=>console.log('hi'));