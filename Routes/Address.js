import express from 'express'
import {addAddress,getAdd} from '../Controllers/Address.js'
import { isuserClientLoginAuth } from '../middleware/Auth.js'

const router = express.Router()

router.post('/add', isuserClientLoginAuth, addAddress)
router.get('/get', isuserClientLoginAuth, getAdd)

export default router