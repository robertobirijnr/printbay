const express = require("express");
const router =express.Router()
const userController = require('../controller/user')
const authenticate = require('../middleware/auth')


router
    .route('/register')
    .post(userController.registerUser)
    

router
    .route('/user-profile')    
    .all(authenticate)
    .get(userController.userProfile)
    
router
    .route('/login')
    .post(userController.login)    



module.exports = router    