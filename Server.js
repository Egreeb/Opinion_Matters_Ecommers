import express from 'express'
import mongoose from 'mongoose'
import UserRouter from './Routes/User.js'
import ProductRouter from './Routes/Product.js'
import CartRouter from './Routes/Cart.js'
import AddressRouter from './Routes/Address.js'
import PaymentRouter from './Routes/Payment.js'
import bodyParser from 'express'
import cors from 'cors'
const app = express()
mongoose.connect(
    "mongodb+srv://saharraalmadeenalandscape_db_user:F6WVTirMwzXo1u9H@openion.zdvwhuu.mongodb.net/",
    {
        dbName:"admin_panel"
}).then(()=>console.log("Mongoose Db Connected")).catch((err)=>console.log(err))


app.use(cors({
    origin:true,
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))


app.use(bodyParser.json());

//END POINT IS API 
app.use('/api/user', UserRouter)
app.use('/api/product', ProductRouter)
app.use('/api/cart', CartRouter)
app.use('/api/address', AddressRouter)
app.use('/api/payment', PaymentRouter)

app.get('/', (req,res)=>{
    res.json({message:"This is homepage", success:true})
})




const port = 8000
app.listen(port,()=> console.log(`server is running on port ${port}`))
