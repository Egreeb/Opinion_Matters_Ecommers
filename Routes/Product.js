import express from 'express'
import {addProdct, deleteProductByid, getAllProduct, getProductbyId, updateProduct} from '../Controllers/Product.js'

const router = express.Router()

// ADD PRODUCT ROUTER
router.post('/add', addProdct)
router.get('/getall', getAllProduct)
router.get('/get/:id', getProductbyId)
router.put('/update/:id', updateProduct)
router.delete('/delete/:id', deleteProductByid)

export default router