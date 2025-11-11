import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title:{type:String, require:true},
    desc:{type:String, require:true},
    price:{type:Number, require:true},
    category:{type:String, require:true},
    imgUrl:{type:String, require:true},
    productQty:{type:Number, require:true},
    featured:{type:Boolean, default:false   }
})

export const Product = mongoose.model('product',ProductSchema)