const express = require('express')
const router = express.Router();
const userController = require('../user_controller/user_cont')
const token = require('../token/jwt')

router.use(express.json())

router.post('/register', userController.registerUser)


router.post('/login', userController.loginUser)

router.put('/userDetialUpdate/:id', token.verifyToken, userController.userDetialUpdate)


module.exports = router