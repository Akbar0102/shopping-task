const express = require('express');
const router = express.Router();

const shoppingController = require('../controllers/shoppingController');
const userController = require('../controllers/userController');

router.route('/shopping')
    .get(shoppingController.findAll)
    .post(shoppingController.create);

router.route('/shopping/:id')
    .get(shoppingController.findOne)
    .put(shoppingController.update)
    .delete(shoppingController.delete);

router.route('/users')
    .get(userController.findAll)
    .post(userController.create);

router.route('/users/signin')
    .post(userController.findOne);

module.exports = router;