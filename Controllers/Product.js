import { Product } from "../Modules/Product.js"


// ADD PRODUCT
export const addProdct = async(req,res) =>{
    const {title,desc,price,category,imgUrl,productQty} = req.body
    if(title == "" || desc == "" || price == "" || category == "" || imgUrl == "" || productQty =="") return res.json({message:"Fields Can Not be left empty"})
        let product = await Product.create({title,desc,price,category,imgUrl,productQty})
    if(!product) return res.json({message:"something went wrong", success:false})
        res.json({message:"Product Added Successfully", product, success:true})
}

// GET ALL PRODUCT
export const getAllProduct = async(req,res)=>{
    try {
        const product = await Product.find()
        if(!product) return res.json({message:"No Products Found", success:false})
            res.json({message:"All Prdoucts Fetched", product, success:true})
    } catch (error) {
        console.error(error)
    }
}
// GET PRODUCT BY ID
export const getProductbyId = async(req,res)=>{
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        if(!product) return res.json({message:"No Product Id match", success:false})
            res.json({message:"Product Fetched By Id", product, success:true})
    } catch (error) {
        console.error(error)
    }
}

// GET PRODUCT BY ID AND UPDATE
export const updateProduct = async(req,res)=>{
    try {
        const {title,desc,price,category,imgUrl,productQty,featured} = req.body    
        const id = req.params.id
        const product = await Product.findByIdAndUpdate(id,{
        title,desc,price,category,imgUrl,productQty,featured
        }, {new:true})
        if(!product) return res.json({message:"No Product Id match", success:false})
            res.json({message:"Product Has Been Updated", product, success:true})
    } catch (error) {
        console.error(error)
    }
}

// GET PRODUCT BY ID AND DELETE
export const deleteProductByid = async(req,res)=>{
    let id = req.params.id
    let product = await Product.findByIdAndDelete(id)
    if(!product) return res.json({message:"Wrong Id", success:false})
        res.json({message:"Product Found And Deleted", product, success:true})
}