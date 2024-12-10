const UserModel = require('../model/user.js');
const dbName = process.env.DB_NAME;


// module.exports.save = async(userData) =>{
//     return await UserModel.getCollection(dbName)(userData).save();
// }
module.exports.save = async(userData) =>{
    const user = new UserModel(userData);
    return await user.save();
}
// module.exports.find = async () =>{
//     return UserModel.getCollection(dbName).find();
// }
module.exports.find = async () =>{
    return UserModel.find();
}