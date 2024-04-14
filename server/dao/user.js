const UserModel = require('../model/user.js');
const dbName = process.env.DB_NAME;


module.exports.save = async(userData) =>{
    return await UserModel.getCollection(dbName)(userData).save();
}
module.exports.find = async () =>{
    return UserModel.getCollection(dbName).find();
}