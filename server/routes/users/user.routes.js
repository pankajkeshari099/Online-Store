const express = require("express");
const routes = express.Router({caseSensitive : true});
const userController = require('../../controller/user.js')
const checkUserAuth = require('../../middleware/auth-middleware.js')

// routes.post('/changePassword', checkUserAuth);
routes.post('/changePassword',checkUserAuth, userController.changePassword)
routes.post('/registration', userController.registration);
routes.get('/getUser', userController.getUser);
routes.post('/login', userController.login);

module.exports = routes;