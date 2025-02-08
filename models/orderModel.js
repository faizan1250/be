import mongoose from 'mongoose';

// CREATING SCHEMA AS PER REQUIREMENT
const orderSchema = new mongoose.Schema({
    userId: { type: String , required : true},
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default: 'Order Placed' },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Date , required:true },
});

// CREATE A NEW MODEL OR IF EXSIST DON'T CREATE A NEW ONE 
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;
