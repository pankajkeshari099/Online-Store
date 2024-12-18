const UserModel = require('../model/user.js');


module.exports.save = async(userData) =>{
    const user = new UserModel(userData);
    return await user.save();
}
module.exports.find = async () =>{
    return UserModel.find();
}
module.exports.findOne = async(email)=>{
    console.log("email in dao", email);
    return UserModel.findOne({email: email})
} 