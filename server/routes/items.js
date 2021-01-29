const express = require('express');
const router = express.Router();
const itemController = require('../controller/items');
const onlyAuthenticate = require('../middleware/auth');
const onlyAdmin = require('../middleware/admin')


router
    .route('/')
    .get(itemController.getAllItems)
    .all(onlyAuthenticate,onlyAdmin)
    .post(itemController.createItem)

router
    .route('/:id')    
    .get(itemController.getSingleItem)
    // .all(onlyAuthenticate,onlyAdmin)
    .patch(itemController.updateItem)
    .delete(itemController.deleteItem)

module.exports = router;    