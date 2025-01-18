const express = require('express')
const routes = express.Router({caseSensitive: true});
const userController = require('../../controller/user.js')

const checkUserAuth = require('../../middleware/auth-middleware.js')

// routes.post('/changePassword',checkUserAuth, userController.changePassword)
routes.post('/registration', userController.registration);
routes.post('/login', userController.login);
routes.get('/getUserProfile', checkUserAuth, userController.getUserProfile);
routes.get('/getUsers', userController.getUsers);

module.exports = routes;