const express = require("express");
const routes = express.Router({caseSensitive : true});

// routes.use('/authentication/',require('../routes/authentication/authentication.routes.js'))
routes.use('/user/',require('../routes/users/user.routes.js'))
routes.use('/product/',require('../routes/products/product.routes.js'))
module.exports = routes;
