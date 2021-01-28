const express = require("express");
const router =express.Router()
const userController = require('../controller/user')


router
    .route('/')
    .post(userController.registerUser)



module.exports = router    