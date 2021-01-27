const express = require('express');
const router = express.Router();
const itemController = require('../controller/items');


router
    .route('/')
    .get(itemController.getAllItems)
    .post(itemController.createItem)


module.exports = router;    