import jwt from 'jsonwebtoken'
import {Register, RegisterClient} from '../Modules/Register.js'
import dotenv from 'dotenv'

dotenv.config()

export const isuserLoginAuth = async(req,res, next) =>{
    const  token = req.header("Auth")
    const veryfytoken = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET)
    if(!veryfytoken) return res.json({message:"Login First", success:false})
        const userId = veryfytoken.userId
        let user = await Register.findById(userId)
        if(!user) return res.json({message:'User Not Found', success:false})
            req.global = user
            next()
}

export const isuserClientLoginAuth = async(req,res, next) =>{
    const  token = req.header("Auth")
    const veryfytoken = jwt.verify(token, process.env.CLIENT_TOKEN_SECRET)
    if(!veryfytoken) return res.json({message:"Login First", success:false})
        const userId = veryfytoken.userId
        let user = await RegisterClient.findById(userId)
        if(!user) return res.json({message:'User Not Found', success:false})
            req.global = user
            next()
}
