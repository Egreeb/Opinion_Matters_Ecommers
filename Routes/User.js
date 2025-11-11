import express from 'express'
import {deleteuserByid, getAll, getById, getClientuser, getuser, Login, LoginClient, RegisterClientfun, RegisterUser} from '../Controllers/User.js'
import {isuserClientLoginAuth, isuserLoginAuth} from '../middleware/Auth.js'

const router = express.Router()

// ADMIN ROUTS
// REGISTER ROUTE
router.post('/register', RegisterUser)

// LOGING ROUT
router.post('/login', Login)

// GET ALL USER
router.get('/getall', isuserLoginAuth, getAll)

// GET ALL USER
router.get('/get/:id', getById)

// GET USER PROFILE
router.get('/getloginuser', isuserLoginAuth, getuser)

router.delete('/delete/:id', isuserLoginAuth, deleteuserByid)



// CLIENT ROUTES

router.post('/registerclient', RegisterClientfun)

router.post('/clientlogin', LoginClient)

router.get('/getclientuser', isuserClientLoginAuth, getClientuser)




export default router
