const express = require("express");
const router =express.Router()
const userController = require('../controller/user')
const authenticate = require('../middleware/auth')


router
    .route('/')
    .post(userController.registerUser)
    .all(authenticate)
    .get(userController.userProfile)



module.exports = router    