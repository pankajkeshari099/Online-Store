const userDao = require('../dao/user.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

const registration = async (req, res) => {
    try {
        let userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            phone: req?.body?.phone,
            address: req?.body?.address,
            role: req?.body?.role
        }
        let hashPassword = await bcrypt.hash(userData.password, saltRounds);
        userData.password = hashPassword;
        const result = await userDao.save(userData);
        res.status(200).json({ user: result,status:true, message: "Registration successful" });
    } catch (error) {
        console.error(error);
        res.status(401).json({status:true,message: "Registration failed!"});
    }
}
const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const verifyUser = await userDao.findOne(email);
    if (!verifyUser) {
        return res.status(401).json({ status: false, message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, verifyUser.password);

    if (!match) {
        return res.status(401).json({ status: false, message: "Invalid email or password" });
    }
    // Generate JWT
    var token = jwt.sign(
        { userId: verifyUser._id },
        process.env.SECRET_KEY,
        { expiresIn: '30m' });
    res.status(200).json({ status: true, message: "Login successfull", token: token, userType: verifyUser.role, userId: verifyUser._id });
}
const getUserProfile = async (req, res) => {
    try {
        const id = req.user._id;
        const result = await userDao.findById(id);
        res.status(200).json({ status: true, user: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getUsers = async(req, res) => {
    try {
        const result = await userDao.find();
        res.status(200).json({status: true, users: result});
    } catch (error) {
        console.error(error);
    }
}
module.exports = {
    registration,
    login,
    getUserProfile,
    getUsers
}