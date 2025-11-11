import {Cart} from '../Modules/Cart.js'

export const addToCart = async(req,res)=>{
    const userId =  req.global
     const {productId, title,price,imgUrl,productQty} = req.body 
     if(productId == "" || title == " " || price == " "|| productQty == "") return res.json({message:"Fields Can not be empty"})

    let cart = await Cart.findOne({userId})
    if(!cart){
        cart = new Cart({userId, items:[]})        
    }

    // CHECK THE ITEM ALREADY EXIST OR NOT USING PRODUCT ID
    const findIndex = cart.items.findIndex((data)=> data.productId.toString() == productId)
    if(findIndex > -1){
        // item already exist just add qty and price
        cart.items[findIndex].productQty += productQty
        cart.items[findIndex].price += productQty * price
        res.json({message:"Quantity Added", cart, success:true})
    }else{
        cart.items.push({productId,title,price,imgUrl,productQty})
    }
    await cart.save()

    res.json({message:"Product added successfully", cart, success:true})   
}

// GET USER CART
export const userCart = async(req,res)=>{
    const userId =  req.global
    let cart = await Cart.findOne({userId})
    if(!cart) return res.json({message:"User Cart Not Found"})
        res.json({message:" User Items Fetched", cart, success:true})
}

// REMOVE PRODUCT FROM CART
export const removeProductFromCart = async(req,res)=>{
    const productId = req.params.id
    const userId =  req.global
    let cart = await Cart.findOne({userId})
    if(!cart) return res.json({message:"User Cart Not Found"})
        cart.items = cart.items.filter((item)=> item.productId.toString() !== productId)
    await cart.save()    
     res.json({message:"Cartproduct has been remove", success:true})
}

// CLEAR CART
export const clearCart = async(req,res)=>{
    const userId =  req.global
    let cart = await Cart.findOne({userId})
    if(!cart) {
        cart = new Cart({items:[]})
    }else{
        cart.items = []
    }
    await cart.save()
    res.json({message:"Full Cart Has Been Clear", success:true})

}

// DECREASE QTY

export const DecreaseQty = async(req,res)=>{
    const userId =  req.global
     const {productId,productQty} = req.body 
     if(productId == "" || productQty == "") return res.json({message:"Fields Can not be empty"})

    let cart = await Cart.findOne({userId})
    if(!cart){
        cart = new Cart({userId, items:[]})        
    }

    // CHECK THE ITEM ALREADY EXIST OR NOT USING PRODUCT ID
    const findIndex = cart.items.findIndex((data)=> data.productId.toString() == productId)
    if(findIndex > -1){
        // item already exist just MINUS THE qty and price
        const item = cart.items[findIndex]
        if(item.productQty > productQty){
            const priceperUnit = item.price / item.productQty
            item.productQty -= productQty
            item.price -= priceperUnit * productQty
            res.json({message:"Quantity Decreased", cart, success:true})
        }else{
                cart.items.splice(findIndex,1)
        }
    }else{
        res.json({message:"Invalid Product ID", success:false})
    }
    await cart.save()
    res.json({message:"Item Qty Decrease", cart, success:true})
}
