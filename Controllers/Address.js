import { Address } from "../Modules/Address.js"


export const addAddress = async(req,res)=>{
    let {fullname,address,city,state,country,pincode,phoneNumber} = req.body
    let userId = req.global
    if(fullname == "" || address == "" || city == "" || state == "" || country == "" || pincode == "", phoneNumber == "") return res.json({message:"Address Fileds can not be empty", success:false})
        let userAddress = await Address.create({
            userId,
            fullname,
            address,
            city,
            state,
            country,
            pincode,
            phoneNumber
        });
        res.json({message:"Address Added", userAddress, success:true})
}

// GET ADDRESS
export const getAdd = async(req,res)=>{
    let userId = req.global
    const getAdd = await Address.findOne({ userId }).sort({ createdAt: -1 });
    if(!getAdd) return res.json({message:"Address not found user id not fetched", success:false})
        res.json({message:`Welcome Mr.${getAdd.fullname}`, getAdd, success:true})
}