import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

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
app.use('/api/categories',categoryRouter)
app.use('/api/orders',orderRouter)
app.use('/api/reviews',reviewRouter)
app.use('/api/productreviews',productReviewRouter)
app.use('/api/deliveries',deliveryRouter)
app.use('/api/riders',riderRouter)

export default app