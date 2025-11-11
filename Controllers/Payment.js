import { Payment } from "../Modules/Payment.js";
import Razorpay from 'razorpay'
import dotenv from 'dotenv'

dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// CHEKOUT
export const Checkout = async(req,res)=>{
    const {amount, cartiTems, userShipping, userId} = req.body   

    const options = {
        amount: amount*100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json({
        orderId: order.id,
        amount:amount,
        cartiTems,
        userShipping,
        userId,
        PayStatus:"Created"
    });
}

// VERIFY AND SAVE TO DB
export const Verify = async(req,res)=>{
    const {orderId,Paymentid,signature,amount,orderItems,userId,userShipping} = req.body

    let orderConfirm = await Payment.create({
        orderId,
        Paymentid,
        signature,
        amount,
        orderItems,
        userId,
        userShipping,
        PayStatus:"Success"
    });
 res.json({message:"Payment Successfull", success:true, orderConfirm})   
}

// USER SPECIFIC ORDER
export const userOrder = async(req,res)=>{
    const userId =  req.global._id.toString()
    let orders = await Payment.find({userId}).sort({orderDate: -1})
    res.json({message:"User Specify Orders", success:true, orders})
}

//ALL ORDERS FOR ADMIN PANEL
export const AllOrder = async(req,res)=>{
    let orders = await Payment.find().sort({orderDate: -1})
    res.json({message:"All Orders", success:true, orders})
}