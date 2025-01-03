import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser';

// importing routes
import userRouter from './routes/user.routes';
import restaurantRouter from './routes/restaurant.routes';
import productRouter from './routes/product.routes';
import orderRouter from './routes/order.routes';
import categoryRouter from './routes/category.routes';
import reviewRouter from './routes/review.routes';
import productReviewRouter from './routes/productReview.router'
import deliveryRouter from './routes/delivery.routes';
import riderRouter from './routes/rider.routes';
import paymentRouter from './routes/payment.routes';
import adminRouter from './routes/admin.routes';

const app = express()

app.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.1.18:5173'] ,
    credentials : true
}))

app.use(bodyParser.json({limit:'16mb'}))
// app.use(express.json({limit:'16mb'}))
app.use(express.urlencoded({limit:'16kb' , extended : true}))
app.use(express.static('public'))

app.use(cookieParser())

app.use('/api/users',userRouter)
app.use('/api/restaurants',restaurantRouter)
app.use('/api/products',productRouter)
app.use('/api/categories',categoryRouter)
app.use('/api/orders',orderRouter)
app.use('/api/reviews',reviewRouter)
app.use('/api/productreviews',productReviewRouter)
app.use('/api/deliveries',deliveryRouter)
app.use('/api/riders',riderRouter)
app.use('/api/payments',paymentRouter)
app.use('/api/admin',adminRouter)
app.use('/api/test',(req,res)=>{
    res.send('test')
})

export default app