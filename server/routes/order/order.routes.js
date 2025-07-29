const express = require('express');
const routes = express.Router({caseSensitive: true});
const orderController = require('../../controller/order.js')
const checkUserAuth = require('../../middleware/auth-middleware.js')

routes.post('/placeOrder', checkUserAuth, orderController.save);
routes.get('/getOrder/:userType',checkUserAuth,orderController.getOrder)

module.exports = routes;