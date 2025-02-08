import express from 'express'
import{ placeOrderCod, placeOrderRazorpay, placeOrderStripe, allOrders, userOrder, updateStatus} from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter = express.Router()

// Admin features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment features
orderRouter.post('/cod',authUser,  placeOrderCod)
orderRouter.post('/stripe',authUser, placeOrderStripe)
orderRouter.post('/razorpay',authUser, placeOrderRazorpay)

//  user Featutes
orderRouter.post('/userorder',authUser, userOrder)

export default orderRouter ;