import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// ORDER THROUGH COD
const placeOrderCod = async(req,res) => {
    try {
        // TAKING INFORMATION FROM USER
        const{ userId, items, amount, address, date} = req.body ;
    
        // SENDINF INFO OF USER AS AN OBJECT TO DB AS PER DB MODEL
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod : "COD",
            payment : false,
            date : Date.now()        
        }
    
        // CREATING NEW ORDER
        const neworder = new orderModel(orderData)
        // SAVING NEW ORDER
        await neworder.save()
    
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({ success : true , message : "Order Placed"})
    
    } catch (error) {
        console.log(error)
        res.json({ success : false, message : error.message})
    }
}

// ORDER THROUGH STRIPE
const placeOrderStripe = async(req,res) => {

}

// ORDER THROUGH RAZORPAY
const placeOrderRazorpay = async(req,res) => {

}

// ORDER FOR ADMIN PANEL
const allOrders = async(req,res) => {
    try {

        const orders = await orderModel.find({ });
        res.json({ success : true , orders})
    
    } catch (error) {
        console.log(error)
        res.json({ success:false , message: error.message})
    }
}

// ORDER FOR FRONTEND
const userOrder = async(req,res) => {
try {
    const { userId } = req.body

    const orders = await orderModel.find({ userId });
    res.json({ success : true , orders})

} catch (error) {
    console.log(error)
    res.json({ success:false , message: error.message})
}
}

// UPDATE ORDER STATUS from admin panel
const updateStatus = async(req,res) => {
try {
    const{ orderId, status} = req.body ;

     await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success : true , message:"Status updated"})
    
} catch (error) {
    console.log(error)
    res.json({ success:false, message: error.message})
}
}

export { placeOrderCod, placeOrderRazorpay, placeOrderStripe, allOrders, userOrder, updateStatus}
