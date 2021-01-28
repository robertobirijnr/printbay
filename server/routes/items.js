const express = require('express');
const router = express.Router();
const itemController = require('../controller/items');


router
    .route('/')
    .get(itemController.getAllItems)
    .post(itemController.createItem)

router
    .route('/:id')    
    .get(itemController.getSingleItem)

module.exports = router;    