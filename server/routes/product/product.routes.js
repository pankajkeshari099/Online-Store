const express = require('express');
const routes = express.Router({caseSensitive: true});
const productController = require('../../controller/product.js')
const checkUserAuth = require('../../middleware/auth-middleware.js')

routes.post('/addProduct', productController.addProduct);
routes.get('/getProduct',productController.getProduct);
routes.get('/getFilterProduct',productController.getFilterProduct);
routes.get('/productById/:id',productController.productById);
routes.get('/getProductCategory/',productController.getProductCategory);
routes.get('/getProductBrands/:productType',productController.getProductBrands);
routes.delete('/deleteProduct/:productId',productController.deleteProduct);
routes.put('/updateProduct',checkUserAuth, productController.updateProduct)
module.exports = routes;