const express = require('express')
const routes = express.Router({caseSensitive: true});

routes.use('/user/', require('../routes/user/user.routes.js'))
routes.use('/product/',require('../routes/product/product.routes.js'))
routes.use('/cart/',require('../routes/cart/cart.routes.js'))
routes.use('/order/',require('../routes/order/order.routes.js'))
module.exports = routes;