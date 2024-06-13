import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// importing routes
import userRouter from './routes/user.routes';
import restaurantRouter from './routes/restaurant.routes';
import productRouter from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import categoryRoutes from './routes/category.routes';
import reviewRoutes from './routes/review.routes';
import productReviewRouter from './routes/productReview.router'


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
app.use('/api/categories',categoryRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/reviews',reviewRoutes)
app.use('/api/productreviews',productReviewRouter)

export default app