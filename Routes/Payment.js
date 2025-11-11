import express from 'express'
import { Checkout,Verify,userOrder,AllOrder } from '../Controllers/Payment.js'
import {isuserClientLoginAuth} from '../middleware/Auth.js'

const router = express.Router()

 // intialise payment
router.post('/checkout', Checkout)

//verify and send to DB
router.post('/verify-payment', Verify)
// FOR CLIENT
router.get('/userorder', isuserClientLoginAuth, userOrder)
 // FOR ADMING PANEL
router.get('/allorder', isuserClientLoginAuth, AllOrder)

export default router

