import mongoose from "mongoose";

const connectMongodb = async() => {
    
    mongoose.connection.on('connected',()=>{
        console.log("DB CONNECTED")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`)
}

export default connectMongodb