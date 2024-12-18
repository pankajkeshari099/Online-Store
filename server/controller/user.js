const userDao = require('../dao/user.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registration = async (req, res) => {
    try {
        let obj = req.body;
        let userData = {
            username: obj.username,
            email: obj.email,
            password: obj.password,
            phone: obj.phone,
            address: obj.address
        }
        const saltRounds = 10;
        const hashPassowrd = await bcrypt.hash(userData.password, saltRounds);
        userData.password = hashPassowrd;
        const user = await userDao.save(userData);
        res.status(201).json({ user: user, message: "Registration successful"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const login = async (req, res) => {
    try {
        let {email, password} = req.body;
        const user = await userDao.findOne(email);
        if(!user)
        {
            return res.status(404).json({ message: "Email does not exist!" });
        }
                
        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return res.status(401).json({message: "Invalid email or password!"})
        }
        //Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '30m', });
        res.status(200).json({message: "Login successful", token: token, userId: user._id});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userDao.find();
        res.status(200).json({user:user})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const changePassword = async(req, res) => {
    console.log("This is change password");
}
module.exports = {
    registration,
    login,
    getUser,
    changePassword
}