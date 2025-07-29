const userDao = require('../dao/user.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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
        res.status(200).json({ user: result, status: true, message: "Registration successful" });
    } catch (error) {
        console.error(error);
        res.status(401).json({ status: true, message: "Registration failed!" });
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
const getUser = async (req, res) => {
    try {
        const id = req.user._id;
        const result = await userDao.findById(id);
        res.status(200).json({ status: true, user: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await userDao.findUserById(id);
        res.status(200).json({ status: true, user: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getUsers = async (req, res) => {
    try {
        const result = await userDao.find();
        res.status(200).json({ status: true, users: result });
    } catch (error) {
        console.error(error);
    }
}
const updateProfile = async (req, res) => {
    try {
        const id = req.user._id;
        const { username, email, phone, address } = req?.body;
        if (!username || !email || !phone || !address) {
            return res.status(400).json({ status: false, message: 'Missing required fields' });
        }
        let data = {
            username,
            email,
            phone,
            address
        }
        const result = await userDao.update(id, data);
        res.status(200).json({ status: true, message: "Profile updated successfully", user: result })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = {
    registration,
    login,
    getUser,
    getUsers,
    updateProfile,
    getUserById
}