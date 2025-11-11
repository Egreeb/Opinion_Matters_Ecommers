import express from 'express'
import {addToCart, clearCart, DecreaseQty, removeProductFromCart, userCart} from '../Controllers/Cart.js'
import { isuserClientLoginAuth } from '../middleware/Auth.js'
const router = express.Router()

router.post('/add', isuserClientLoginAuth, addToCart)
router.get('/get', isuserClientLoginAuth, userCart)
router.delete('/remove/:id', isuserClientLoginAuth, removeProductFromCart)
router.delete('/clear', isuserClientLoginAuth, clearCart)
router.post('/--qty', isuserClientLoginAuth, DecreaseQty)

export default router