import mongoose from "mongoose";

const UserRegSchema = new mongoose.Schema({
    first_name:{type:String, require:true},
    last_name:{type:String, require:true},
    emailId:{type:String, require:true},
    phone_num:{type:Number, require:true},
    user_role:{type:String, require:true},
    Password:{type:String, require:true},
    CreatedAt:{type:Date, default:Date.now()}
})


export const Register = mongoose.model('user', UserRegSchema)


const ClientRegSchema = new mongoose.Schema({
    first_name:{type:String, require:true},
    last_name:{type:String, require:true},
    emailId:{type:String, require:true},
    phone_num:{type:Number, require:true},
    Password:{type:String, require:true},
    CreatedAt:{type:Date, default:Date.now()}
})


export const RegisterClient = mongoose.model('userclient', ClientRegSchema)