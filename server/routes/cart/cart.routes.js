const express = require('express');
const routes = express.Router({caseSensitive: true});
const cartController = require('../../controller/cart.js')
const checkUserAuth = require('../../middleware/auth-middleware.js')

routes.post('/saveCart', checkUserAuth, cartController.saveCart);
routes.get('/getCart',checkUserAuth,cartController.getCart)
routes.delete('/removeCartProduct/:productId', checkUserAuth, cartController.removeCartProduct);
routes.put('/updateCartListQty', checkUserAuth,cartController.updateCartListQty);

module.exports = routes;