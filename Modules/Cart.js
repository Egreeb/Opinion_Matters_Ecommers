import mongoose, { Schema } from "mongoose";

const ItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    title:{type:String, require:true},
    price:{type:Number, require:true},
    imgUrl:{type:String, require:true},
    productQty:{type:Number, require:true},
});

const UserSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    items:[ItemSchema]
})

export const Cart = mongoose.model('cart',UserSchema)