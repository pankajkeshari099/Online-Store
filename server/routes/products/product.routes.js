const express = require('express');
const routes = express.Router({caseSensitive : true});
const productController = require('../../controller/product.js')

routes.post('/addProduct', productController.addProduct);
routes.get('/getProduct', productController.getProduct);
module.exports = routes;