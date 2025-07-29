const jwt = require('jsonwebtoken');
const UserModel = require('../model/user.js');

const checkUserAuth = async (req, res, next) => {
    let token;
    // Token comes from client side in header, accept in header at server side.
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = authorization.split(' ')[1];
            // Verify token
            const { userId } = jwt.verify(token, process.env.SECRET_KEY);
            req.user = await UserModel.findById(userId).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ status: "failed", message: "Unauthorized User" });
        }
    } else {
        res.status(401).json({ status: "failed", message: "Unauthorized User, No token" });
    }
}

module.exports = checkUserAuth;