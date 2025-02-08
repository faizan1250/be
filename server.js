import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectMongodb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';

// APP CONFIG
const app = express();
const port = process.env.PORT || 3000
connectMongodb()
connectCloudinary()

// MIDDLEWARES
app.use((express.json())) ;
app.use(cors())

// API ENDPOINTS
app.use('/api/user',userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=> console.log("Server started on port" +port))