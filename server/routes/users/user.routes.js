const express = require("express");
const routes = express.Router({caseSensitive : true});
const userController = require('../../controller/user.js')

routes.post('/registration', userController.registration);
routes.get('/getUser', userController.getUser);
module.exports = routes;