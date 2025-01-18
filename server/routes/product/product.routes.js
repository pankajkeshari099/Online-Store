const express = require('express');
const routes = express.Router({caseSensitive: true});
const productController = require('../../controller/product.js')

routes.post('/addProduct', productController.addProduct);
routes.get('/getProduct/:type',productController.getProduct);
routes.get('/productById/:id',productController.productById);
routes.get('/getProductCategory',productController.getProductCategory);

module.exports = routes;