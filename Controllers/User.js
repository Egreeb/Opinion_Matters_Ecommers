import {Register, RegisterClient} from '../Modules/Register.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// USER REGISTRATION ADMIN PANEL
export const RegisterUser = async(req,res)=>{
    const {first_name,last_name,emailId,phone_num,user_role,Password} = req.body

    if(first_name == "" || last_name == "" || emailId == "" || phone_num == "" || user_role == "", Password == "" )
        res.json({message:"Fileds Can not be left empty", success:false})
    
    let user = await Register.findOne({emailId})
    if(user) return res.json({message:"Email Id Already Exist in Database", success:false})
        const hashPassword = await bcrypt.hash(Password,10)
       user = await Register.create({
            first_name,
            last_name,
            emailId,
            phone_num,
            user_role,
            Password:hashPassword
        })
        res.json({message:"User Register Successfully", user, success:true})


    res.json({message:"this is registered function"})

}

// USER LOGIN
export const Login = async(req,res)=>{
    const {emailId,Password} = req.body
    
    let user = await Register.findOne({emailId})
    if(!user) return res.json({message:"User Not Found", success:false})        
        const validatePass = await bcrypt.compare(Password, user.Password)
    if(!validatePass) return res.json({message:"Wrong Password", success:false})
        // token creation and sending
        const token = await jwt.sign({userId:user._id}, process.env.ADMIN_TOKEN_SECRET, {expiresIn:"1d"})
        res.json({message: `Welcom Mr.${user.first_name+  " " + " " + user.last_name}`, token, success:true})
}

// GET ALL USER
export const getAll = async(req,res)=>{
    let user = await Register.find()
        if(!user) return res.json({message:"No User Found", success:false})        
            res.json({message:"User Found", user, success:true})
}

// GET USER BY ID

export const getById = async(req,res)=>{
    const paramid = req.params.id 
    // const userId = req.global
    let user = await Register.findById(paramid)
    if(!user) return res.json({message:'Paramid is not match in database', success:false})
        res.json({message:"User Id Match", user, success:true})
}

export const getuser = async(req,res)=>{
    let user = req.global
    res.json({message:"Successfully Fetch Login Usered", user })
}

export const deleteuserByid = async(req,res)=>{
    let userId = req.params.id
    console.log(userId)
    let user = await Register.findByIdAndDelete(userId)
    if(!user) return res.json({message:"Wrong Id", success:false})
        res.json({message:"User Found", user, success:true})
}



// USER REGISTRATION FRONT CLIENT
export const RegisterClientfun = async(req,res)=>{
    const {first_name,last_name,emailId,phone_num,Password} = req.body

    if(first_name == "" || last_name == "" || emailId == "" || phone_num == "" || Password == "" )
        res.json({message:"Fileds Can not be left empty", success:false})
    
    let user = await RegisterClient.findOne({emailId})
    if(user) return res.json({message:"Email Id Already Exist in Database", success:false})
        const hashPassword = await bcrypt.hash(Password,10)
       user = await RegisterClient.create({
            first_name,
            last_name,
            emailId,
            phone_num,
            Password:hashPassword
        })
    res.json({message:"User Register Successfully", user, success:true})

}

export const LoginClient = async(req,res)=>{
    const {emailId,Password} = req.body
    
    let user = await RegisterClient.findOne({emailId})
    if(!user) return res.json({message:"User Not Found", success:false})        
        const validatePass = await bcrypt.compare(Password, user.Password)
    if(!validatePass) return res.json({message:"Wrong Password", success:false})
        // token creation and sending
        const token = await jwt.sign({userId:user._id}, process.env.CLIENT_TOKEN_SECRET)
        res.json({message: `Welcom Mr.${user.first_name+  " " + " " + user.last_name}`, token, success:true})
}

export const getClientuser = async(req,res)=>{
    let user = req.global
    res.json({message:"Successfully Fetch Login Usered", user })
}