const userDao = require('../dao/user.js')
const registration = async (req, res) => {
    try {
        let obj = req.body;
        userData = {
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,
            password: obj.password,
            phone: obj.phone,
            address: obj.address
        }
        const user = await userDao.save(userData);
        res.status(201).json({ user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userDao.find();
        console.log("user",getUser);
        res.status(200).json({user:user})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    registration,
    getUser
}